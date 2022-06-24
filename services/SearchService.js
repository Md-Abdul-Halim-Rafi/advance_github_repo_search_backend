const githubService = require("./GithubService");
const { isArrayAndHasContent } = require("../utils/utils");
const redisClient = require("../utils/redis-client");
const logger = require("../loaders/logger");

// Helper Functions
const getTopContributor = async (statsPromises, redisKeys) => {

    let topContributorData = {
        topContributorUsername: null,
        topContributorAdditions: null,
        topContributorDeletions: null,
        topContributorCommits: null
    }

    try {

        const allContributorsData = await Promise.all(statsPromises);

        logger.info(`Picked stats: ${allContributorsData.length}`);

        let topContributors = [];

        for (let i = 0; i < allContributorsData.length; i++) {

            const contributors = allContributorsData[i].data;

            if (redisKeys[i]) {
                redisClient.set(redisKeys[i], JSON.stringify(contributors), "ex", 15 * 60);
            }

            if (!isArrayAndHasContent(contributors)) {

                topContributors.push(topContributorData);
                continue;
            }

            const sortedContributors = contributors
                .map(contributor => ({
                    topContributorUsername: contributor.author.login,
                    topContributorAdditions: contributor.weeks.reduce((acc, y) => acc += y.a, 0),
                    topContributorDeletions: contributor.weeks.reduce((acc, y) => acc += y.d, 0),
                    topContributorCommits: contributor.weeks.reduce((acc, y) => acc += y.c, 0),
                }))
                .sort((a, b) =>
                    (b.topContributorAdditions + b.topContributorDeletions + b.topContributorCommits) -
                    (a.topContributorAdditions + a.topContributorDeletions + a.topContributorCommits)
                );

            topContributors.push(sortedContributors[0]);
        }

        return topContributors;

    } catch (err) {

        logger.error(err);
        return [];
    }
}

const searchedRepositories = async (query) => {

    const { q, page } = query;

    try {

        const githubRepositories = await githubService.searchGithubRepositories(q, page);

        if (!githubRepositories) {
            return { status: 500, msg: "Github Server Error" };
        }

        let repositories = [];
        const statsPromises = [];
        const redisKeys = [];

        for (let i = 0; i < githubRepositories.repositories.length; i++) {

            const repository = githubRepositories.repositories[i];

            let statsPromise = null;
            const redisKey = `${repository.owner.login}-${repository.name}`;

            let result = await redisClient.get(redisKey);

            if (result && JSON.parse(result).length) {

                redisKeys.push(null);
                logger.info(`Picked stats from redis for: ${redisKey}`);
                statsPromise = Promise.resolve({ data: JSON.parse(result) });
              
            } else {

                redisKeys.push(redisKey);

                statsPromise = githubService.githubContributorStats(
                    repository.owner.login,
                    repository.name
                );
            }

            statsPromises.push(statsPromise);

            repositories.push({
                id: repository.id,
                name: repository.name,
                author: repository.owner.login,
                description: repository.description,
                updatedAt: repository.updated_at,
                language: repository.language,
                url: repository.html_url
            });
        }

        const topContributors = await getTopContributor(statsPromises, redisKeys);

        repositories = repositories.map((repository, index) => ({
            ...repository,
            ...topContributors[index]
        }));

        return { status: 200, repositories, count: githubRepositories.count };

    } catch (err) {

        logger.error(err);

        return { status: 500, msg: "Internal Server Error" };
    }
}

module.exports = { searchedRepositories };
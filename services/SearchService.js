const githubService = require("./GithubService");
const { isArrayAndHasContent } = require("../utils/utils");

// Helper Functions
const getTopContributor = async (statsPromises) => {

    let topContributorData = {
        topContributorUsername: null,
        topContributorAdditions: null,
        topContributorDeletions: null,
        topContributorCommits: null
    }

    try {

        const allContributorsData = await Promise.all(statsPromises);

        let topContributors = [];

        for (let i = 0; i < allContributorsData.length; i++) {

            const contributors = allContributorsData[i].data;

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

        console.error(err);

        return [];
    }
}

const searchedRepositories = async (search_text) => {

    try {

        const githubRepositories = await githubService.searchGithubRepositories(search_text);

        if (!githubRepositories) {
            return { status: 500, msg: "Github Server Error" };
        }

        let repositories = [];
        const statsPromises = [];

        for (let i = 0; i < githubRepositories.repositories.length; i++) {

            const repository = githubRepositories.repositories[i];

            const statsPromise = githubService.githubContributorStats(
                repository.owner.login,
                repository.name
            );

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

        const topContributors = await getTopContributor(statsPromises);

        repositories = repositories.map((repository, index) => ({
            ...repository,
            ...topContributors[index]
        }));

        return { status: 200, repositories, count: githubRepositories.count };

    } catch (err) {

        console.error(err);

        return { status: 500, msg: "Internal Server Error" };
    }
}

module.exports = { searchedRepositories };
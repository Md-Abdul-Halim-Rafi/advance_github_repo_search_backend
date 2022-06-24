const { default: axiosInstance } = require("axios");

const axios = axiosInstance.create({
    baseURL: "https://api.github.com",
    headers: {
        "Accept": "application/vnd.github.v3+json",
        // "Authorization": `token <TOKEN>`
    }
});

const searchGithubRepositories = async (query, page = 1) => {

    const SORT = "updated";
    const MAX_LIMIT = 20;

    try {

        let apiURL = "/search/repositories";
        apiURL += `?q=${query}`;
        apiURL += `&sort=${SORT}&order=desc`;
        apiURL += `&per_page=${MAX_LIMIT}&page=${page}`;

        const { data } = await axios.get(apiURL);

        const repositories = data.items.map(repository => ({
            id: repository.id,
            name: repository.name,
            author: repository.owner.login,
            description: repository.description,
            updatedAt: repository.updated_at,
            language: repository.language,
            topContributorUsername: repository.top_contributor_username,
            topContributorAdditions: repository.top_contributor_additions,
            topContributorDeletions: repository.top_contributor_deletions,
            topContributorCommits: repository.top_contributor_commits,
            url: repository.html_url
        }));

        return { count: data.total_count, repositories };
        
    } catch (err) {
        
        console.error(err.response);

        return false;
    }
}

const githubContributorStats = async (owner, repository) => {

    try {

        const { data } = await axios.get(
            `/repos/${owner}/${repository}/stats/contributors`
        );

        return data;
        
    } catch (err) {
        
        console.error(err);
        
        return false;
    }
}

module.exports = { searchGithubRepositories, githubContributorStats };
const { default: axiosInstance } = require("axios");

const axios = axiosInstance.create({
    baseURL: "https://api.github.com",
    headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `token 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`
    }
});

const searchGithubRepositories = async (query, page = 1) => {

    const SORT = "stars";
    // const SORT = "updated";
    const MAX_LIMIT = 2;

    try {

        let apiURL = "/search/repositories";
        apiURL += `?q=${query}`;
        apiURL += `&sort=${SORT}&order=desc`;
        apiURL += `&per_page=${MAX_LIMIT}&page=${page}`;

        const { data } = await axios.get(apiURL);

        return { count: data.total_count, repositories: data.items };

    } catch (err) {

        console.error(err.response);

        return false;
    }
}

const githubContributorStats = (owner, repository) => {

    return axios.get(
        `/repos/${owner}/${repository}/stats/contributors`
    );
}

module.exports = { searchGithubRepositories, githubContributorStats };
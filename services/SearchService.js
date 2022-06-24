const githubService = require("./GithubService");

const searchedRepositories = async (search_text) => {

    try {

        const githubRepositories = await githubService.searchGithubRepositories(search_text);

        return { status: 200, githubRepositories };
        
    } catch (err) {
        
        console.error(err);

        return { status: 500, msg: "Internal Server Error" };
    }
}

module.exports = { searchedRepositories };
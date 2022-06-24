const { searchedRepositories } = require("../../services/SearchService");

const getSearchedRepositories = async (req, res) => {

    const result = await searchedRepositories(req.query.q);
    return res.status(result.status).json(result);
}

module.exports = {
    getSearchedRepositories
}
const { errors, celebrate } = require("celebrate");

const { searchedRepositories } = require("../validations/search");
const { getSearchedRepositories } = require("../controllers/serach");

const { Router } = require("express");

const router = Router();

const searchRoutes = (app) => {

   router.get("/repositories", celebrate(searchedRepositories), getSearchedRepositories);

   router.use(errors());

   app.use("/special-search", router);
}

module.exports = searchRoutes;
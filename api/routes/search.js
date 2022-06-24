const { getSearchedRepositories } = require("../controllers/serach");

const { Router } = require("express");

const router = Router();

const searchRoutes = (app) => {

   router.get("/repositories", getSearchedRepositories);

   app.use("/special-search", router);
}

module.exports = searchRoutes;
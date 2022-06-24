const { Router } = require("express");
const { errors, celebrate } = require("celebrate");

const { searchedRepositories } = require("../validations/search");
const { getSearchedRepositories } = require("../controllers/serach");

const rateLimitMiddleware = require("../middlewares/rate-limiter");
const createRateLimiter = require("../../utils/rate-limiter");

const router = Router();

const searchRoutes = (app) => {

	router.get(
		"/repositories",
		rateLimitMiddleware(createRateLimiter("search-limit", 50, 600)),
		celebrate(searchedRepositories), 
		getSearchedRepositories
	);

	router.use(errors());

	app.use("/special-search", router);
}

module.exports = searchRoutes;
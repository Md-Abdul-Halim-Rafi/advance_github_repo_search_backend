const { Router } = require("express");

const searchRoutes = require("./routes/search");

const loadRoutes = () => {

    const router = Router();

	searchRoutes(router);

    return router;
}

module.exports = loadRoutes;

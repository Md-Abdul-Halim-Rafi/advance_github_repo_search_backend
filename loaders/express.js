const cors = require("cors");
const morgan = require("morgan");

const loadRoutes = require("../api");
const logger = require("./logger");

const expressLoader = async (app) => {

	app.use(cors());

    app.use(morgan("combined", { stream: logger.stream }));

    app.enable("trust proxy");

    app.get("/", (req, res) => {

        return res.status(200).send("OK");
    });

    app.use(process.env.API_PREFIX, loadRoutes());
}

module.exports = expressLoader;
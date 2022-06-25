const cors = require("cors");
const morgan = require("morgan");

const loadRoutes = require("../api");
const logger = require("./logger");

const expressLoader = async (app) => {

	app.use(cors({
        origin: ["https://nuport.mainly.codes"],
    }));

    app.use(morgan("combined", { stream: logger.stream }));

    app.enable("trust proxy");

    app.use(process.env.API_PREFIX, loadRoutes());
}

module.exports = expressLoader;
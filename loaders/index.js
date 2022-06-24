const dotenv = require("dotenv");
const expressLoader = require("./express");

const loader = (app) => {

    dotenv.config();

    expressLoader(app);
}

module.exports = loader;
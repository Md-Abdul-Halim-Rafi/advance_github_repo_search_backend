require("dotenv").config();

const Redis = require("ioredis");

const logger = require("../loaders/logger");

const { redisConf } = require("./redis-conf");

const redisClient = new Redis(redisConf[process.env.NODE_ENV]);

redisClient.on("error", function(err) {
	logger.error(err);
});

redisClient.on("connect", function() {
    logger.info("Connected to the Redis Server");
});

redisClient.on("ready", function() {
    logger.info("Redis Instance is Ready!");
});

module.exports = redisClient;
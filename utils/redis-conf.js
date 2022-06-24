const redisConf = {
    [process.env.NODE_ENV]: {
        host: process.env.REDIS_HOST,
        port: "6379",
        family: "4",
        password: process.env.REDIS_PASSWORD,
        db: 0,
        showFriendlyErrorStack: true,
        retryStrategy: function() {
            const delay = 20000;
            return delay;
        },
    }
}

const redisConfRateLimiter = {
    [process.env.NODE_ENV]: {
        host: process.env.REDIS_HOST,
        port: "6379",
        family: "4",
        password: process.env.REDIS_PASSWORD,
        db: 0,
        enableOfflineQueue: false
    }
}

module.exports = {
    redisConf,
    redisConfRateLimiter
}
const redisConf = {
    development: {
        host: "host.docker.internal",
        port: "6379",
        family: "4",
        password: "123456",
        db: 0,
        showFriendlyErrorStack: true,
        retryStrategy: function() {
            const delay = 20000;
            return delay;
        },
    },
    production: {
        host: "127.0.0.1",
        port: "6379",
        family: "4",
        password: "%%NUPORT!!",
        db: 0,
        showFriendlyErrorStack: true,
        retryStrategy: function() {
            const delay = 20000;
            return delay;
        },
    }
}

const redisConfRateLimiter = {
    development: {
        host: "host.docker.internal",
        port: "6379",
        family: "4",
        password: "123456",
        db: 0,
        enableOfflineQueue: false
    },
    production: {
        host: "127.0.0.1",
        port: "6379",
        family: "4",
        password: "%%NUPORT!!",
        db: 0,
        enableOfflineQueue: false
    }
}

module.exports = {
    redisConf,
    redisConfRateLimiter
}
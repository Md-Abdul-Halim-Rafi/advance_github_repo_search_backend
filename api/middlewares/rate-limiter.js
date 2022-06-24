
const rateLimitMiddleware = (rateLimiter) => {

	return (req, res, next) => {
		rateLimiter.consume(req.ip)
			.then(() => {
				next();
			})
			.catch(() => {
				res.status(429).json({ msg: "Too Many Requests" });
			});
	}
}

module.exports = rateLimitMiddleware;
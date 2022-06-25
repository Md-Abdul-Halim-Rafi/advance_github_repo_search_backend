module.exports = {
	apps: [
		{
			script: "./server.js",
			name: "nuport-1",
			env: {
				NAME: "nuport-1",
				PORT: 5000
			}
		},
		{
			script: "./server.js",
			name: "nuport-2",
			env: {
				NAME: "nuport-2",
				PORT: 5001
			}
		}
	],
};

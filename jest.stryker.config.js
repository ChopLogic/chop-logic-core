module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": ["ts-jest", { isolatedModules: true }],
	},
	maxWorkers: 2,
	cache: false,
};

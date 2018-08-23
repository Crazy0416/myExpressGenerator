'use strict';

// required environment variables
	[
		'NODE_ENV'
	].forEach((name) => {
	if (!process.env[name]) {
		throw new Error(`Environment variable ${name} is missing`)
	}
});

const config = {
	mongodb: {
		DATABASE: 'myExpressGenerator',
		PORT: '27017',
		HOST: 'localhost'
	},
	server: {
		PORT: 3000
	}
};

module.exports = config;
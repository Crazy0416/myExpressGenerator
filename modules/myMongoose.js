// mongoose setup
const mongoClient = require('mongoose');
const mongoConnectionPoolSize = 10;
const dbURI = `mongodb://localhost/es6Test`;

// mongoose create connection pool
function initConnect() {
    mongoClient.connect(dbURI, {
        poolSize: mongoConnectionPoolSize
    });
}


mongoClient.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + dbURI);
    console.log((mongoClient.connection.readyState === 1) ? "connect success" : "connect fail");
});

mongoClient.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ', err);
});

mongoClient.connection.on('disconnected', () => {
    console.log('Mongoose default connection discoonnected ');
});

process.on('SIGINT', function() {
    mongoClient.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// connect mongoDB server
initConnect();

module.exports = mongoClient;
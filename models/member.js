const mongoClient = require('mongoose');

const memberSchema = new mongoClient.Schema({
   name: String,
   createOn: Date
});

module.exports = mongoClient.model('member', memberSchema);
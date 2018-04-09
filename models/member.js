const mongoClient = require('../modules/myMongoose');

const memberSchema = new mongoClient.Schema({
   name: String,
   createOn: Date
});

module.exports = mongoClient.model('member', memberSchema);
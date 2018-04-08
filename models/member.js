const mongoClient = require('../modules/myMongoose');

const memberSchema = new mongoClient.Schema({
   name: String,
   createOn: Date
});

const member = module.exports = mongoClient.model('member', memberSchema);
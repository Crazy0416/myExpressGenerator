const mongoClient = require('mongoose');
// Error class
const MongoError = require('../errors/MongoError');

const UserSchema = new mongoClient.Schema({
   uid: {
      type: String,
       required: true,
       unique: true
   },
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   createOn: Date
});

// 회원가입 메서드
UserSchema.statics.register = function(userData) {
   return new Promise(async function (resolve, reject) {
      let userDoc;
      try {
          userDoc = await this.create(userData);
          resolve(userDoc);
      } catch (errCreate) {
         // TODO: windston 에러 로그 출력
         console.log(errCreate);
         reject(new MongoError("회원가입을 하지 못했습니다.", 500, 500, new Date()));
      }
   }.bind(this))
}

module.exports = mongoClient.model('user', UserSchema);
# MyExpressGenerator

npm express-generator처럼 자신만의 generator를 구축하고자 한다.



## 목차

[디렉토리 구조](##디렉토리 구조)





## 디렉토리 구조

```
.
├── app
│   ├── controllers
│   ├── helpers
│   ├── models
│   ├── routes
│   └── views
├── app.js
├── bin
│   └── www
├── config
│   └── config.js
├── ecosystem.json
└── public
```

- controllers: 각 routes의 핸들러를 정의하는 곳입니다.
- helpers: 프로젝트 내에서 사용하는 사용자 정의 모듈이나 함수를 정의하는 곳입니다.
- models: 데이터 모델을 정의하고 비즈니스 로직을 정의하는 곳입니다.
- views: 웹 서비스의 뷰를 담당하는 파일들을 모아둡니다.
- app.js: express의 객체를 생성하고 미들웨어 설정을 정의하는 곳입니다.
- bin/www: 서버의 시작 파일입니다.
- config: 설정 파일들을 모아둡니다.
- ecosystem.json: pm2 모듈로 서비스를 구동할 때 사용합니다.
- public: 프로젝트의 정적 파일들을 관리하는 곳입니다.  



## MVC 패턴 적용

정확히 말하자면 MVRC(Model, View, Router, Controller)로 프로젝트를 분할하여 관리합니다. 

- Model: 모델 객체와 그것의 비즈니스 로직을 정의합니다.
- View: express의 템플릿 엔진에 따라 ejs, pug 파일 등을 관리합니다.
- Router: url에 따라 컨트롤러의 메소드를 사용하고 url들을 관리하는 곳입니다. 
- Controller: 각 url Router마다 핸들러를 정의합니다. 



각 Model, Router, Controller마다 같은 이름을 가진 파일들이 있고 그 파일들마다 연관성이 존재해야합니다.

**Router example**

```javascript
// UserRouter.js
'use strict';

const express = require('express');
const router = express.Router();
const wrap = require('express-async-wrap');

const UserCtrl = require('../controllers/UserCtrl');	// 컨트롤러 객체

router.route('/users/register')
	.post(wrap(UserCtrl.register)); // 회원가입

module.exports = router;
```



**Controller example**

```javascript
// UserCtrl.js
'use strict';

const userSchema = require('../models/UserSchema');
const to = require('await-to-js').default;

exports.register = async(req, res, next) => {
    let userData = {
        uid: req.body.uid,
        name: req.body.name,
        password: req.body.password
    };

    let [err, userDoc] = await to(userSchema.register(userData));
    if(err)
    	throw err;
    
    res.json({
        "success": true,
        "code": 200,
        "message": "회원가입이 완료되었습니다.",
        "time": new Date()
    })
};
```



**Model example**

```javascript
// userModel.js
'use strict';

const mongoClient = require('mongoose');
const to = require('await-to-js').default;

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
      let [errCreate, userDoc] = await to(this.create(userData));
      if(errCreate) {
        errCreate.message = "회원가입을 실패하였습니다."; reject(errCreate);
      }
      
      resolve(userDoc);
   }.bind(this))
};

module.exports = mongoClient.model('user', UserSchema);
```



## 디자인 패턴

### 1. 컨트롤러에 async 적용









## 코드 컨벤션


"use strict"
const route = require('koa-route');
const userCtrl = require('../controllers/userCtrl');
const accountCtrl = require("../controllers/accountCtrl")

module.exports = function (app) {
  // app.use(route.get(''), )
  
  app.use(route.get('/', function() {
    return this.render('index', {
      title: 'xxx首页'
    })
  }));

  app.use(route.get('/cate',  function *() {
     // return this.render('index', {
     //  title: 'hello ~~~'
     // })
    let links = [
      "<a href='/register'>注册</a>",
      "<a href='/user/list'>全部用户</a>"
    ];
    this.body = links.join("<br />");
  }));
  app.use(route.get('/register', function() {
    return this.render('registerForm', {
      title: '注册'
    })
  }));

  app.use(route.get('/login', function() {
    return this.render('loginForm', {
      title: '登录'
    })
  }));

  app.use(route.get('/user/update', function() {
    return this.render('userUpdateForm', {
      title: '修改用户资料'
    })
  }));

  app.use(route.get('/user/accountAdd', function() {
    return this.render('accountAddForm', {
      title: '记账'
    })
  }));

  app.use(route.post( '/user/signup', userCtrl.signup ));
  app.use(route.post( '/user/signin', userCtrl.signin ));
  app.use(route.get( '/user/logout', userCtrl.logout ));
  app.use(route.get( '/user/isLogin', userCtrl.isLogin ));
  app.use(route.get( '/user/list', userCtrl.list ));
  app.use(route.get( '/user/getDetail', userCtrl.getUserDetail ));
  app.use(route.post( '/user/update', userCtrl.update ));
  app.use(route.post( '/user/account/add', accountCtrl.add ));  
  app.use(route.get( '/user/account/list', accountCtrl.list ));
  app.use(route.post( '/user/account/update', accountCtrl.update ));  
  app.use(route.get( '/user/account/delete', accountCtrl.delete ));
}
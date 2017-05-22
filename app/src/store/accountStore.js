/**
 * Created by zyy on 2016/12/29.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
const AccountAction = require("../action/accountAction");
class AccountStore{
    constructor(){
        this.bindActions(AccountAction);
    }

    onAddSuccess(result){
        this.result = result;
    }
    onListSuccess(result){
        this.account = result;
    }
    onUpdateSuccess(result){
        this.account = result;
    }
    onDeleteSuccess(result){
        this.account = result;
    }
    onLoadListSuccess(result){
        this.account = result;
    }

  
  



    onRegisterFail(){}
    onLoginFail(){}
}
module.exports = Flux.createStore(AccountStore);

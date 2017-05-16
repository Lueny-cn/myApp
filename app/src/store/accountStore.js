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
        this.result = result;
    }
    onUpdateSuccess(result){
        this.result = result;
    }
    onDeleteSuccess(result){
        this.result = result;
    }
    onLoadListSuccess(result){
        this.result = result;
    }

  
  



    onRegisterFail(){}
    onLoginFail(){}
}
module.exports = Flux.createStore(AccountStore);

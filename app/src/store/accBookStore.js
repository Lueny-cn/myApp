/**
 * Created by zyy on 2016/12/29.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
const AccBookAction = require("../action/accBookAction");
class AccBookstore {
    constructor(){
        this.bindActions(AccBookAction);
    }

    onAddaccBookSuccess(result){
        this.accBook = result;
    }
    onListSuccess(result){
        this.accBook = result;
    }
    onUpdateSuccess(result){
        this.accBook = result;
    }
    onRemoveSuccess(result){
        this.accBook = result;
    }

  
  



    onRegisterFail(){}
    onLoginFail(){}
}
module.exports = Flux.createStore(AccBookstore);

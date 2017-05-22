"use strict";
const Flux = require("pin-alt/src/flux");
const IndexAction = require("../action/indexAction");
class IndexStore{
  constructor(){
    this.bindActions(IndexAction);

    }
    onGetConsumStateSuccess(result){
        this.result = result;
    }
    onGetEachMonthOutSuccess(result){
        this.outMList = result;
    }
    onGetEachMonthIncomeSuccess(result){
        this.incomeMList = result;
    }

    onGetConsumStateGFail(){}

}
module.exports = Flux.createStore(IndexStore);


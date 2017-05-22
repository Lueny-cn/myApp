"use strict";

const Flux = require("pin-alt/src/flux");
class IndexAction {
	constructor() {
		 this.url = {
            consumState:'http://localhost:3000/user/account/consumState',
            eachMonthOut: 'http://localhost:3000/user/account/listEachMonth/out',
            eachMonthIncome: 'http://localhost:3000/user/account/listEachMonth/income'
        };
		this.generateActions('getConsumStateSuccess','getConsumStateFail','getEachMonthIncomeSuccess','getEachMonthIncomeFail',
        'getEachMonthOutSuccess','getEachMonthOutFail');

	}

	getConsumState(){
		let sUrl = this.url["consumState"];
        $.ajax({
            url: sUrl,
            type: 'get',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.getConsumStateSuccess(result.data);
                }else{
                    this.getConsumStateFail();
                }
            },
            error: ()=> {
                this.getConsumStateFail();
            }
        });
	}

    getEachMonthOut(){
		let sUrl = this.url["eachMonthOut"];
        $.ajax({
            url: sUrl,
            type: 'get',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.getEachMonthOutSuccess(result.data);
                }else{
                    this.getEachMonthOutFail();
                }
            },
            error: ()=> {
                this.getEachMonthOutFail();
            }
        });
	}

    getEachMonthIncome(){
		let sUrl = this.url["eachMonthIncome"];
        $.ajax({
            url: sUrl,
            type: 'get',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.getEachMonthIncomeSuccess(result.data);
                }else{
                    this.getEachMonthIncomeFail();
                }
            },
            error: ()=> {
                this.getEachMonthIncomeFail();
            }
        });
	}

}
module.exports = Flux.createActions(IndexAction);

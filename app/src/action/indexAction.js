"use strict";

const Flux = require("pin-alt/src/flux");
class IndexAction {
	constructor() {
		 this.url = {
            consumState:'http://localhost:3000/user/account/consumState',
        };
		this.generateActions('getConsumStateSuccess','getConsumStateFail');

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

}
module.exports = Flux.createActions(IndexAction);

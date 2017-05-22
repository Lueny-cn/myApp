"use strict";
const Flux = require("pin-alt/src/flux");
import { message } from 'antd';
class AccountAction {

    constructor(){
        this.url = {
            add:'http://localhost:3000/user/account/add',
            list:'http://localhost:3000/user/account/list',
            update:'http://localhost:3000/user/account/update',
            remove: 'http://localhost:3000/user/account/delete',
        };
        this.generateActions('addSuccess','addFail','deleteSuccess','deleterFail',
        'isLoginSuccess','isLoginFail',"listSuccess", "listFail", "updateSucess","updateFail");
    }

    addAccount(data) {
          let sUrl = this.url["add"];
            $.ajax({
                url: sUrl,
                type: 'post',
                dataType:"json",
                data: data,
                xhrFields: {withCredentials : true},
                crossDomain: true,
                success: (result)=> {
                    if(result) {
                        this.addSuccess(result);
                        message.success('添加成功', 2);
                        setTimeout(function(){
                            history.go(0)
                        }, 1000);
                    }else {
                        this.addFail();
                    }
                },
                error: ()=> {
                    this.addFail();
                }
            });
    }

    list() {
        let sUrl = this.url["list"];
            $.ajax({
                url: sUrl,
                type: 'get',
                dataType:"json",
                xhrFields: {withCredentials : true},
                crossDomain: true,
                success: (result)=> {
                    if(result) {
                        this.listSuccess(result.data);
                    }else {
                        this.listFail();
                    }
                },
                error: ()=> {
                    this.listFail();
                }
            });
    }


}
module.exports = Flux.createActions(AccountAction);
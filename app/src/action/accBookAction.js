"use strict";
const Flux = require("pin-alt/src/flux");
import { message } from 'antd';
class AccBookAction {

    constructor(){
        this.url = {
            add:'http://localhost:3000/user/accountBook/add',
            update:'http://localhost:3000/user/accountBook/update',
            remove: 'http://localhost:3000/user/accountBook/remove',
            list: 'http://localhost:3000/user/accountBook/list'
        };
        this.generateActions('addAccBookSuccess','addAccBookFail',"removeSuccess","removeFail",
        'isLoginSuccess','isLoginFail',"listSuccess", "listFail", "updateSucess","updateFail",
        "updateSuccess","updateFail");
    }


    addAccBook(data) {
          let sUrl = this.url["add"];
            $.ajax({
                url: sUrl,
                type: 'post',
                dataType:"json",
                data: data,
                xhrFields: {withCredentials : true},
                crossDomain: true,
                success: (result)=> {
                    if(result.code == 200) {
                        this.addAccBookSuccess(result.data);
                        message.success("账本添加成功");
                        window.reload();
                    }else {
                        this.addAccBookFail();
                        message.error(result.msg);
                    }
                },
                error: ()=> {
                    this.addAccBookFail();
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

    updateBook(data) {
        let sUrl = this.url["update"];
            $.ajax({
                url: sUrl,
                type: 'post',
                dataType:"json",
                data: data,
                xhrFields: {withCredentials : true},
                crossDomain: true,
                success: (result)=> {
                    if(result.code == 200) {
                        this.updateSuccess(result);
                        message.success(result.msg);
                        window.location.reload();
                    }else {
                        message.error(result.msg);
                        // this.updateFail();
                    }
                },
                error: ()=> {
                    this.updateFail();
                }
            });
    }

    removeBook(data) {
        let sUrl = this.url["remove"];
            $.ajax({
                url: sUrl,
                type: 'post',
                dataType:"json",
                data: data,
                xhrFields: {withCredentials : true},
                crossDomain: true,
                success: (result)=> {
                    if(result.code == 200) {
                        this.removeSuccess(result);
                        message.success(result.msg);
                        window.reload();
                    }else {
                        message.error(result.msg);
                        // this.removeFail();
                    }
                },
                error: ()=> {
                    this.removeFail();
                }
            });
    }


}
module.exports = Flux.createActions(AccBookAction);
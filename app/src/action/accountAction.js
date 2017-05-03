/**
 * Created by zyy on 2016/12/28.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
import { message } from 'antd';
class AccountAction {

    constructor(){
        this.url = {
            add:'http://localhost:3000/user/account/add',
            list:'http://localhost:3000/user/account/list',
            update:'http://localhost:3000/user/account/update',
            remove: 'http://localhost:3000/user/account/delete'
        };
        this.generateActions('addSuccess','addFail','deleteSuccess','deleterFail',
        'isLoginSuccess','isLoginFail',"listSucess", "listFail", "updateSucess","updateFail");
    }

    login(email,psd){
        let sUrl = this.url["login"];
        $.ajax({
            url: sUrl,
            type: 'post',
            data:{
                email:email,
                password:psd
            },
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                // if(result.code == 200) {
                    this.loginSuccess(result);
                // }else{
                //     this.loginFail();
                // }
            },
            error: ()=> {
                this.loginFail();
            }
        });
    }
    register(email,psd){
        let sUrl = this.url["register"];
        $.ajax({
            url: sUrl,
            type: 'post',
            data:{
                email:email,
                password:psd
            },
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.registerSuccess(result);
                }else{
                    this.registerFail();
                    message.error(result.msg, 5)
                }
            },
            error: ()=> {
                this.registerFail();
            }
        });
    }

    logOut(){
        let sUrl = this.url["logOut"];
        $.ajax({
            url: sUrl,
            type: 'get',
            dataType:"json",
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success: (result)=> {
                if(result.code == 200) {
                    this.logoutSuccess(result);
                }else{
                    this.logoutFail();
                }
            },
            error: ()=> {
                this.logoutFail();
            }
        });
    }
    isLogin(){
        let sUrl = this.url["isLogin"];
        $.ajax({
            url: sUrl,
            type: 'get',
            dataType:"json",
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success: (result)=> {
                if(result) {
                    this.isLoginSuccess(result);
                }else {
                    this.isLoginFail();
                }
            },
            error: ()=> {
                this.isLoginFail();
            }
        });
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
                    }else {
                        this.addFail();
                    }
                },
                error: ()=> {
                    this.addFail();
                }
            });
    }


}
module.exports = Flux.createActions(AccountAction);
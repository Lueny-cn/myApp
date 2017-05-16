"use strict";
const Flux = require("pin-alt/src/flux");
import { message } from 'antd';
class AccBookAction {

    constructor(){
        this.url = {
            add:'http://localhost:3000/user/accountBook/add',
            list:'http://localhost:3000/user/accountBook/list',
            update:'http://localhost:3000/user/accountBook/update',
            remove: 'http://localhost:3000/user/accountBook/delete',
            loadList: 'http://localhost:3000/user/accountBook/list'
        };
        this.generateActions('addAccBookSuccess','addAccBookFail','deleteSuccess','deleterFail',
        'isLoginSuccess','isLoginFail',"listSucess", "listFail", "updateSucess","updateFail","loadListSuccess","loadListFail");
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
                    if(result) {
                        this.addAccBookSuccess(result.data);
                    }else {
                        this.addAccBookFail();
                    }
                },
                error: ()=> {
                    this.addAccBookFail();
                }
            });
    }

    loadList() {
        let sUrl = this.url["loadList"];
            $.ajax({
                url: sUrl,
                type: 'get',
                dataType:"json",
                xhrFields: {withCredentials : true},
                crossDomain: true,
                success: (result)=> {
                    if(result) {
                        this.loadListSuccess(result.data);
                    }else {
                        this.loadListFail();
                    }
                },
                error: ()=> {
                    this.loadListFail();
                }
            });
    }


}
module.exports = Flux.createActions(AccBookAction);
"use strict";
const Flux = require("pin-alt/src/flux");
const { message } =  require("antd");
class PersonalMsgAction {

    constructor(){
        this.url = {
            "userDetail":'http://localhost:3000/user/getDetail',
            'update':'http://localhost:3000/user/update'
        };
        this.generateActions('getMsgSuccess','getMsgFail','updateMsgSuccess','updateMsgFail');
    }

    getUserDetail(){
        let sUrl = this.url['userDetail'];
        $.ajax({
            url:sUrl,
            type:'get',
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success:(result)=>{
                if(result.code == 200){
                    this.getMsgSuccess(result.data);
                }else{
                    this.getMsgFail();
                }
            },
            error:()=>{
                this.getMsgFail();
            }
        })
    }

    updateMsg(name,gender,tel,birthday){
        let sUrl = this.url["update"];
        $.ajax({
            url:sUrl,
            type:'post',
            data:{
                nickname:name,
                gender:gender,
                tel:tel,
                birthday:birthday,
            },
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success:(result)=>{
                if(result.code == 200){
                    this.updateMsgSuccess(result.data);
                    message.success("资料更新成功");
                    setTimeout( ()=> {
                        window.location.reload();
                    }, 1000)
                }else{
                    message.error(result.msg);
                    this.updateMsgFail();
                }
            },
            error:()=>{
                this.updateMsgFail();
            }
        })
    }
}
module.exports = Flux.createActions(PersonalMsgAction);

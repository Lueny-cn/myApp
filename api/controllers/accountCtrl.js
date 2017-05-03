const AccountModel = require("../models/account")

module.exports = {
    add: function *() {

        let user_email = this.session.user.email

        let {
            type,
            money,
            time,
            avatar,
            detail,
            accountbook_id,
        } = this.request.body;
        
        let data = {
            type,
            money,
            time,
            avatar,
            detail,
            user_email,
            accountbook_id
        }

        let res = yield AccountModel.add(data);
        console.log(res)
        if (res !== {}) {
            this.body = {
                code: 200,
                data: res
            }
        }
   },

    list: function *(option) {
        let page = this.query.page || 1;
        let limit = 10;
        let skip = (page-1)*limit;
        let result;
        let {
            time,
            type,
            accountbook_id } = this.request.body; 
        switch(option) {
            case "time": 
                result = yield AccountModel.find({"time": time}).skip(skip).limit(limit);
                break; 
            case "type": 
                result = yield AccountModel.find({"type": type}).skip(skip).limit(limit);
                break; 
            case "accountbook_id":
                result = yield AccountModel.find({"accountbook_id": accountbook_id}).skip(skip).limit(limit);
                break; 
            default:
                result = yield AccountModel.find().skip(skip).limit(limit);
        }
        

        this.body = {
            code: 200,
            data: result
        }
   },

   update: function *() {

       let user_email = thie.session.email
       let {
           _id,
            type,
            money,
            time,
            avatar,
            detail,
            accountbook_id,
        } = this.request.body;
        
        let data = {
            _id,
            type,
            money,
            time,
            avatar,
            detail,
            user_email,
            accountbook_id,
        };

        let res = yield AccountModel.update(data);
        
        if(res.nModified  && res.nModified === 1) {
            this.body = {
                code: 200,
                msg: "更新成功"
            }
        } else if(res.ok && res.ok === 1 ){
            this.body = {
                code: 302,
                msg: "数据未修改"
            }
        } else {
            this.body = {
                code: 500,
                msg: "服务器发生错误"
            }
        }

   },

   delete: function*(id) {
    let result = yield AccountModel.delete(id);

    this.body = {
        code: 200,
        data: result
    }

   }
}
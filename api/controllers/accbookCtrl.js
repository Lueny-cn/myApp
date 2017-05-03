const AccBookModel = require("../models/account")

module.exports = {
    add: function *() {
        let {
            name,
            type,
            money,
            detail,
        } = this.request.body;
        
        let data = {
            name,
            type,
            money,
            detail,
        }

        let res = yield AccBookModel.add(data);
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
        
        let result = yield UserModel.find().skip(skip).limit(limit);
        
        this.body = {
            code: 200,
            data: result
        }
   },

   update: function() {
       let {
            name,
            type,
            money,
            detail,
        } = this.request.body;
        
        let data = {
            name,
            type,
            money,
            detail,
        };

        let res = yield AccBookModel.update(data);

        
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

   }
}
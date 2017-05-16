const AccountBookModel = require("../models/accountbook")

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

        let res = yield AccountBookModel.add(data);
        if (res !== {}) {
            this.body = {
                code: 200,
                data: res
            }
        }
    },

    list: function *() {
        let page = this.query.page || 1;
        let limit = 10;
        let skip = (page-1)*limit;
        
        let user_email;
        if(this.session && this.session.user) {
            user_email = this.session.user.email;
        }

        let result = yield AccountBookModel.find({
            "user_email": user_email
        }).skip(skip).limit(limit);
        
        this.body = {
            code: 200,
            data: result
        }
    },

    update: function*() {
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

        let res = yield AccountBookModel.update(data);


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

  
}


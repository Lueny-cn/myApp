const AccountBookModel = require("../models/accountbook")
const helper = require("../config/helper");

module.exports = {
    add: function *() {

        let {
            name,
            type,
            money,
            detail,
        } = this.request.body;
        
        let user_email;
        if(this.session && this.session.user) {
            user_email = this.session.user.email;
        } else {
            this.body = {
                code: 400,
                msg: "用户未登录"
            }
            return ;
        }

        
        let data = {
            name,
            type,
            money,
            detail,
            user_email
        }

        let resExist = yield AccountBookModel.find({"name": name});
        if(resExist.length !== 0) {
            this.body = {
                code: 304,
                msg: "账本已经存在"
            }

            return ;
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
        })
        
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

        let res = yield AccountBookModel.updateByName(data);


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

    remove: function *() {
    
        let name = this.request.body.name;
        if(name.match(/^[0-9a-fA-F]{24}$/)) {
            let result = yield AccountBookModel.remove({"name": name});

            if(result.ok === 1 && result.n !== 0) {
                this.body = {
                    code: 200,
                    msg: "数据删除成功"
                }
            } else {
                this.body = {
                    code: 304,
                    msg: "数据已经删除了"
                }
            }
            
        } else {
            this.body = {
                code: 400,
                msg: "输入的数据有误"
            }
        }
    }
}
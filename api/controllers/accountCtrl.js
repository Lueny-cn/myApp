const AccountModel = require("../models/account")
const ISODate = require("isodate")
const {dateRangeUtil} = require("../config/helper");
const AccountBookModel = require("../models/accountbook")

module.exports = {
    add: function *() {
        let user_email;
        if(this.session.user && this.session.user.email) {
            user_email = this.session.user.email
        }else {
            user_email = "default@account.com"
        }        

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

        let book = yield AccountBookModel.find({"user_email": user_email});
        if(!book.user_email) {
            this.body = {
                code: 400,
                msg: "用户未登录"
            }
            return ;
         } else {
             if(type == "out" || type == "transfer") {
                 let book_money = book.money;
                 book_money = (+book_money) -(+money)  
             } else if(type == "income" || type == "debit") {
                 let book_money = book.money;
                 book_money = (+book_money) + (+money)  
             }
             let result_book = yield AccountBookModel.update({"user_email": user_email},{
                "money": book_money
             });
             console.log("result_book", result_book)
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

        let user_email;
        if(this.session.user && this.session.user.email) {
            user_email = this.session.user.email
        }else {
            user_email = "default@account.com"
        }  
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

    },

    incomeMoney: function *(dateRange) {

        let option = dateRange !== undefined ? dateRange : "";
        let result;
        switch(option) {
        case "week":
           result = yield AccountModel.find({"account_type":"income",
                                              "time":{
                                                  $gte:ISODate(dateRangeUtil.getCurrentWeek()[0]),
                                                  $lt:ISODate(dateRangeUtil.getCurrentWeek()[1])}
                                                },{"money":1});
            break;
        case "month":
            result = yield AccountModel.find({"account_type":"income",
                                              "time":{
                                                  $gte:ISODate(dateRangeUtil.getCurrentMonth()[0]),
                                                  $lt:ISODate(dateRangeUtil.getCurrentMonth()[1])}
                                                },{"money":1});
            break;
        case "year":
           result = yield AccountModel.find({"account_type":"income",
                                              "time":{
                                                  $gte:ISODate(dateRangeUtil.getCurrentYear()[0]),
                                                  $lt:ISODate(dateRangeUtil.getCurrentYear()[1])}
                                                },{"money":1});
            break;
        case "range":
             result = yield AccountModel.find({"account_type":"income",
                                              "time":{
                                                  $gte:ISODate(dateRange[0]),
                                                  $lt:ISODate(dateRange[1])}
                                                },{"money":1});
            break;
        default:
             result = yield AccountModel.find({"account_type":"income"},{"money":1});
        }


         console.log("result",result)

        let sum = 0;
        result.map( (item) => {
            sum += item.money
        })
        this.body = {
            code: 200,
            income: sum,
            msg: "收入"
        }
    },

    outMoney: function *() {
        let option = dateRange !== undefined ? dateRange : "";
        let result;
        switch(option) {
        case "week":
           result = yield AccountModel.find({"account_type":"out",
                                              "time":{
                                                  $gte:ISODate(dateRangeUtil.getCurrentWeek()[0]),
                                                  $lt:ISODate(dateRangeUtil.getCurrentWeek()[1])}
                                                },{"money":1});
            break;
        case "month":
            result = yield AccountModel.find({"account_type":"out",
                                              "time":{
                                                  $gte:ISODate(dateRangeUtil.getCurrentMonth()[0]),
                                                  $lt:ISODate(dateRangeUtil.getCurrentMonth()[1])}
                                                },{"money":1});
            break;
        case "year":
           result = yield AccountModel.find({"account_type":"out",
                                              "time":{
                                                  $gte:ISODate(dateRangeUtil.getCurrentYear()[0]),
                                                  $lt:ISODate(dateRangeUtil.getCurrentYear()[1])}
                                                },{"money":1});
            break;
        case "range":
             result = yield AccountModel.find({"account_type":"out",
                                              "time":{
                                                  $gte:ISODate(dateRange[0]),
                                                  $lt:ISODate(dateRange[1])}
                                                },{"money":1});
            break;
        default:
             result = yield AccountModel.find({"account_type":"out"},{"money":1});
        }


         console.log("result",result)

        let sum = 0;
        result.map( (item) => {
            sum += item.money
        })
        this.body = {
            code: 200,
            income: sum,
            msg: "支出"
        }
    }
}
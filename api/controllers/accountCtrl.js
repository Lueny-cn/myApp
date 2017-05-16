const AccountModel = require("../models/account")
const ISODate = require("isodate")
const {dateRangeUtil} = require("../config/helper");
const AccountBookModel = require("../models/accountbook")

module.exports = {
    add: function* () {
        let user_email, book_money;
        if (this.session.user && this.session.user.email) {
            user_email = this.session.user.email
        } else {
            user_email = "default@account.com"
        }

        let {
            type,
            money,
            time,
            avatar,
            detail,
            accountbook_name,
            account_type
        } = this.request.body;
console.log("this.request.body === ",this.request.body)
        let data = {
            type,
            money,
            time,
            avatar,
            detail,
            user_email,
            accountbook_name,
            account_type
        }

        let book = yield AccountBookModel.find({ "user_email": user_email });

        console.log("book", book[0].money)
        if (book.length === 0) {
            this.body = {
                code: 400,
                msg: "用户未登录"
            }
            return;
        } else {
            if (account_type == "out" || account_type == "transfer") {
                book_money = book[0].money;
                book_money = (+book_money) - (+money)
            } else if (account_type == "income" || account_type == "debit") {
                book_money = book[0].money;
                book_money = (+book_money) + (+money)
            }
            
            let result_book = yield AccountBookModel.update({ "user_email": user_email }, {
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

    list: function* (option) {
        let page = this.query.page || 1;
        let limit = 10;
        let skip = (page - 1) * limit;
        let result;
        let {
            time,
            type,
            accountbook_id } = this.request.body;
        switch (option) {
            case "time":
                result = yield AccountModel.find({ "time": time }).skip(skip).limit(limit);
                break;
            case "type":
                result = yield AccountModel.find({ "type": type }).skip(skip).limit(limit);
                break;
            case "accountbook_id":
                result = yield AccountModel.find({ "accountbook_id": accountbook_id }).skip(skip).limit(limit);
                break;
            default:
                result = yield AccountModel.find().skip(skip).limit(limit);
        }


        this.body = {
            code: 200,
            data: result
        }
    },

    update: function* () {

        let user_email;
        if (this.session.user && this.session.user.email) {
            user_email = this.session.user.email
        } else {
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

        if (res.nModified && res.nModified === 1) {
            this.body = {
                code: 200,
                msg: "更新成功"
            }
        } else if (res.ok && res.ok === 1) {
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

    delete: function* (id) {
        let result = yield AccountModel.delete(id);

        this.body = {
            code: 200,
            data: result
        }

    },

    incomeMoney: function* (dateRange) {
        let user_email;
        if(this.session && this.session.user) {
            user_email = this.session.user.email;
        }

        let option = dateRange !== undefined ? dateRange : "";
        let result, _w, _m, _y;
        switch (option) {
            case "week":
                result = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentWeek()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentWeek()[1])
                    }
                }, { "money": 1 });
                break;
            case "month":
                result = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentMonth()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentMonth()[1])
                    }
                }, { "money": 1 });
                break;
            case "year":
                result = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentYear()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentYear()[1])
                    }
                }, { "money": 1 });
                break;
            case "range":
                result = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRange[0]),
                        $lt: ISODate(dateRange[1])
                    }
                }, { "money": 1 });
                break;
            case "wmy":
                _w = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentWeek()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentWeek()[1])
                    }
                }, { "money": 1 });
                _m = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentMonth()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentMonth()[1])
                    }
                }, { "money": 1 });
                _y = yield AccountModel.find({
                    "account_type": "income",
                    "user_email": user_email,
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentYear()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentYear()[1])
                    }
                }, { "money": 1 });

                let _mSum = 0, _wSum = 0, _ySum = 0
                _m.map((item) => {
                    _mSum += item.money
                });
                _w.map((item) => {
                    _wSum += item.money
                });
                _y.map((item) => {
                    _ySum += item.money
                });

                result = {
                    week: _wSum,
                    month: _mSum,
                    year: _ySum
                }


                break;

            default:
                result = yield AccountModel.find({ "account_type": "income" }, { "money": 1 });
        }


        console.log("result", result)

        if (option == "wmy") {
            this.body = {
                code: 200,
                type: "income",
                data: result,
                msg: "收入"
            }

        } else {
            let sum = 0;
            result.map((item) => {
                sum += item.money
            });
            this.body = {
                code: 200,
                type: "income",
                data: sum,
                msg: "收入"
            }
        }
    },

    outMoney: function* (dateRange) {
        let user_email;
        if(this.session && this.session.user) {
            user_email = this.session.user.email;
        }

        let option = dateRange !== undefined ? dateRange : "";
        let result;
        switch (option) {
            case "week":
                result = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentWeek()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentWeek()[1])
                    }
                }, { "money": 1 });
                break;
            case "month":
                result = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentMonth()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentMonth()[1])
                    }
                }, { "money": 1 });
                break;
            case "year":
                result = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentYear()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentYear()[1])
                    }
                }, { "money": 1 });
                break;
            case "range":
                result = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRange[0]),
                        $lt: ISODate(dateRange[1])
                    }
                }, { "money": 1 });
                break;
            case "wmy":
                _w = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentWeek()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentWeek()[1])
                    }
                }, { "money": 1 });
                _m = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentMonth()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentMonth()[1])
                    }
                }, { "money": 1 });
                _y = yield AccountModel.find({
                    "account_type": "out",
                    "time": {
                        $gte: ISODate(dateRangeUtil.getCurrentYear()[0]),
                        $lt: ISODate(dateRangeUtil.getCurrentYear()[1])
                    }
                }, { "money": 1 });

                let _mSum = 0, _wSum = 0, _ySum = 0
                _m.map((item) => {
                    _mSum += item.money
                });
                _w.map((item) => {
                    _wSum += item.money
                });
                _y.map((item) => {
                    _ySum += item.money
                });

                result = {
                    week: _wSum,
                    month: _mSum,
                    year: _ySum
                }


                break;
            default:
                result = yield AccountModel.find({ "account_type": "out" }, { "money": 1 });
        }


        console.log("result", result)

        if (option == "wmy") {
            this.body = {
                code: 200,
                type: "out",
                data: result,
                msg: "支出"
            }

        } else {
            let sum = 0;
            result.map((item) => {
                sum += item.money
            });
            this.body = {
                code: 200,
                type: "out",
                data: sum,
                msg: "支出"
            }
        }
    },

    consumState: function* () {
        let income_w, income_y, income_m,
            out_w, out_y, out_m;

        let user_email;
        if(this.session && this.session.user) {
            user_email = this.session.user.email;
        }
        
        income_w = yield AccountModel.find({
            "account_type": "income",
            "user_email": user_email,
            "time": {
                $gte: ISODate(dateRangeUtil.getCurrentWeek()[0]),
                $lt: ISODate(dateRangeUtil.getCurrentWeek()[1])
            }
        }, { "money": 1 });
        income_m = yield AccountModel.find({
            "account_type": "income",
            "user_email": user_email,
            "time": {
                $gte: ISODate(dateRangeUtil.getCurrentMonth()[0]),
                $lt: ISODate(dateRangeUtil.getCurrentMonth()[1])
            }
        }, { "money": 1 });
        income_y = yield AccountModel.find({
            "account_type": "income",
            "user_email": user_email,
            "time": {
                $gte: ISODate(dateRangeUtil.getCurrentYear()[0]),
                $lt: ISODate(dateRangeUtil.getCurrentYear()[1])
            }
        }, { "money": 1 });

        out_w = yield AccountModel.find({
            "account_type": "out",
            "user_email": user_email,
            "time": {
                $gte: ISODate(dateRangeUtil.getCurrentWeek()[0]),
                $lt: ISODate(dateRangeUtil.getCurrentWeek()[1])
            }
        }, { "money": 1 });
        out_m = yield AccountModel.find({
            "account_type": "out",
            "user_email": user_email,
            "time": {
                $gte: ISODate(dateRangeUtil.getCurrentMonth()[0]),
                $lt: ISODate(dateRangeUtil.getCurrentMonth()[1])
            }
        }, { "money": 1 });
        out_y = yield AccountModel.find({
            "account_type": "out",
            "user_email": user_email,
            "time": {
                $gte: ISODate(dateRangeUtil.getCurrentYear()[0]),
                $lt: ISODate(dateRangeUtil.getCurrentYear()[1])
            }
        }, { "money": 1 });

        let income_mSum = 0, income_wSum = 0, income_ySum = 0,
            out_mSum = 0, out_wSum = 0, out_ySum = 0
        income_m.map((item) => {
            income_mSum += item.money
        });
        income_w.map((item) => {
            income_wSum += item.money
        });
        income_y.map((item) => {
            income_ySum += item.money
        });

        out_m.map((item) => {
            out_mSum += item.money
        });
        out_w.map((item) => {
            out_wSum += item.money
        });
        out_y.map((item) => {
            out_ySum += item.money
        });

       this.body = {
           code: 200,
           data: {
               income: {
                   week: income_wSum,
                   month: income_mSum,
                   year: income_ySum

               },
               out: {
                   week: out_wSum,
                   month: out_mSum,
                   year: out_ySum

               },
               msg: "消费情况"
           }
       }
    }
}
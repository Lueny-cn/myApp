const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const Account = new Schema({
    "type": {
        type: String,
        index: true
    },
    "money":{
        type: Number,
        index: true,
        default: 0
    },
    "time": {
        type: Date,
        index: true
    },
    "avatar": {
        type: String,
        index: true
    },
    "detail": {
        type: String,
        index: true
    },
    "user_email": {
        type: String,
        index: true
    },
    "accountbook_name": {
        type: String,
        index: true
    },
    "account_type": {
        type: String,
        index: true,
        default: "income"
    },
    "created": {
        type: Date,
        default: Date.now
    },
    "updated": {
        type: Date,
        default: Date.now
    }
});

//使用middleware，每次保存都记录一下最后更新时间
Account.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

Account.statics.add = function (data) {
    return this.create(data);
};

Account.statics.delete = function (id) {
    return this.remove({"_id": id});
};

Account.statics.update = function (item) {
    return this.update({"_id": item._id}, {
        "type":  item.type,
        "money": item.money ,
        "time": item.time,
        "avatar": item.avatar,
        "detail": item.detail,
        "user_email": item.user_email,
        "accountbook_id": item.accountbook_id
    }).exec();
};



//创建模型
const model = mongoose.model('Account', Account);

module.exports = model;
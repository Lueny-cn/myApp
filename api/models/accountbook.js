const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const Accountbook = new Schema({
    "name": {
        type: String,
        index: {
            unique: true
        },
        default: ""
    },
    "type": {
        type: String,
        index: true,
        default: ""
    },
    "money":{
        type: Number,
        index: true,
        default: 0
    },
    "detail": {
        type: String,
        index: true,
        default: ""
    },
     "history": {
        type: Object,
        index: true,
        default: null
    },
    "user_email": {
        type: String,
        index: true
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
Accountbook.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

Accountbook.statics.add = function (data) {
    return this.create(data);
};

Accountbook.statics.updateByName = function (data) {
    return this.update({"name": data.name},{
        "type": data.type,
        "money": data.money,
        "detail": data.detail
    }).exec();
};

Accountbook.statics.findByName = function (name) {
    return this.find({"name": name}).exec();
};

//创建模型
const model = mongoose.model('Accountbook', Accountbook);

module.exports = model;
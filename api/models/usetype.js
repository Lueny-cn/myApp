const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const UseType = new Schema({
    "usefor": {
        type: String,
        index: true
    },
    "typeName": {
        type: String,
        index: true
    },
    "budget": {
        type: Object,
        index: true,
        default: null
    },
    "parentName": {
        type: String,
        index: true,
        default: 0
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
UseType.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

UseType.statics.add = function (data) {
    return this.create(data);
};


//创建模型
const model = mongoose.model('UseType', UseType);

module.exports = model;
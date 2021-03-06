const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值


// 试题(比如 xxx面试题)
const SubjectTitle = new Schema({
   "title": {
       type: String,
       index: {
           queue: true
       }
   },
    "subjectItem": {
        type: String,
        index: true
    },
    "subjectItemId": {
        type: String,
        index: true
    },
    "subjectTime": {
        type: String,
        index: true
    },
    "finished": {
        type: Boolean,
        index: true,
        default: false
    },
    "read": {
        type: Boolean,
        index: true,
        default: false
    },
    "created": {
        type: Date,
        default: Date.now,
        index: true
    },
    "updated": {
        type: Date,
        default: Date.now,
        index: true
    }
});

//使用middleware，每次保存都记录一下最后更新时间
SubjectTitle.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

SubjectTitle.statics.add = function (data) {
    return this.create(data);
};

//返回title Id
SubjectTitle.statics.findByTitle  = function (title) {
    return this.findOne({"title": title}, {"_Id": 1 })
        .exec();
};

//这里用的是findOne，只查询一条数据
SubjectTitle.statics.findById = function (id) {
    return this.findOne({"_id": id}, {"title": 1})
        .exec();
};

//试题时间
SubjectTitle.statics.findByTime = function (subjectTime) {
    return this.find({"subjectTime": subjectTime}, {"title": 1})
        .exec();
};

//试题类 (二级目录)
SubjectTitle.statics.findByItemId = function (subjectItemId) {
    return this.find({"subjectItemId": subjectItemId}, {"title": 1})
        .exec();
};

SubjectTitle.statics.doFinished = function(SubjectTitleId){
    return this.update({"_id": SubjectTitleId}, {
        finished: true
    })
}

SubjectTitle.statics.doRead = function(SubjectTitleId){
    return this.update({"_id": SubjectTitleId}, {
        Read: true
    })
}

//创建模型
const model = mongoose.model('SubjectTitle', SubjectTitle);

module.exports = model;
const SubjectTitleModel = require('../models/subjectTitle');
const SubjectItemModel = require('../models/subjectItemType');

//列出所有用户数据，支持分页
exports.list = function *(){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    this.body = yield SubjectTitleModel.find();
};

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function *(){

    var body = this.request.body;
    var data ={};


    if(body) {

       var subjectItem = yield SubjectItemModel.findByTypeName(body.subjectItem);
       if(subjectItem) {
           data.title = body.title;
           data.subjectItem = body.subjectItem;
           data.subjectItemId = subjectItem._id;
           data.subjectTime = body.subjectTime;

           let result = yield new SubjectTitleModel(data).save();
           if(result) {
               this.body = {
                   code: 200,
                   data: result
               };
           } else {
               this.body = {
                   code: 500,
                   msg: "服务器错误"
               }
           }
       }
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};

//更新
exports.update = function *(){

    var body = this.request.body;
    var data ={};
    if(body) {

       var subjectItem = yield SubjectItemModel.findByTypeName(body.subjectItem);
       if(subjectItem) {
           data.title = body.title;
           data.subjectItem = body.subjectItem;
           data.subjectItemId = subjectItem._id;
           data.subjectTime = body.subjectTime;
       }

        let result = yield new SubjectTitleModel(data).update(subjectItem._id, data);
        if(result.nModified  && result.nModified === 1) {
            this.body = {
                code: 200,
                msg: "更新成功"
            }
        } else if(result.ok && result.ok === 1 ){
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
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};



exports.oneByTitleId = function *(titleId){

    if(titleId.match(/^[0-9a-fA-F]{24}$/)) {
        let result = yield SubjectTitleModel.findById(titleId);
        if(result) {
            this.body = {
                code: 200,
                data: result
            }
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};

exports.listBySbId = function *(subjectId){

    if(subjectId.match(/^[0-9a-fA-F]{24}$/)) {
        let result = yield SubjectTitleModel.findByItemId(subjectId);
        if(result) {
            this.body = {
                code: 200,
                data: result
            }
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};

exports.listByTime = function *(time){

    if(time) {
        let result = yield SubjectTitleModel.findByTime(time);
        if(result) {
            this.body = {
                code: 200,
                data: result
            }
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};

exports.doFinshed = function *(){

    let body = this.request.body,
        subjectTitleId = body.subjectTitleId;

     if(subjectTitleId.match(/^[0-9a-fA-F]{24}$/)) {
       let result = yield SubjectTitleModel.findById(subjectTitleId);
        if(result) {
           let updateRes = yield  SubjectTitleModel.doFinshed(subjectTitleId);
           if(updateRes) {
               this.body = {
                   code: 200,
                   data: updateRes,
                   msg: "已经完成"
               }
           } else {
               this.body = {
                   code: 500,
                   msg: "服务器错误"
               }
           }
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "数据有误"
        }
    }
};

exports.doRead = function *(){

    let body = this.request.body,
        subjectTitleId = body.subjectTitleId;

     if(subjectTitleId.match(/^[0-9a-fA-F]{24}$/)) {
       let result = yield SubjectTitleModel.findById(subjectTitleId);
        if(result) {
           let updateRes = yield  SubjectTitleModel.doRead(subjectTitleId);
           if(updateRes) {
               this.body = {
                   code: 200,
                   data: updateRes,
                   msg: "已阅读"
               }
           } else {
               this.body = {
                   code: 500,
                   msg: "服务器错误"
               }
           }
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "数据有误"
        }
    }
};

exports.listFinished = function *() {
    this.body = yield SubjectTitleModel.find({"finished": true});
}

exports.listRead = function *() {
    this.body = yield SubjectTitleModel.find({"read": true});
}





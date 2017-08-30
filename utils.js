'use strict';

function Message(status, msg){
    this.status = status || 200;
    this.msg = msg || success;
}

function JsonRes(success, data, message){
    this.success = success;
    this.data = data;
    this.message = message;
}

exports.Message = Message;
exports.JsonRes = JsonRes;
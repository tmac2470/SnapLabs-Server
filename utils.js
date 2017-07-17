'use strict';

function Message(status, msg){
    this.status = status || 200;
    this.msg = msg || success;
}

exports.Message = Message;
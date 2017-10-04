'use strict';

function Message(success, data, message) {
  this.success = success;
  this.data = data;
  this.message = message;
}

exports.Message = Message;

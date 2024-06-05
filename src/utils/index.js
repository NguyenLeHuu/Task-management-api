const mongoose = require('mongoose');

function Response(res,status, message, data) {
    return res.status(status).json({
      status: status,
      message:message,
      data: data,
    });
  }

function parseToObjectID(id) {
    return new mongoose.Types.ObjectId(id);
  }
  
  module.exports = {
    Response,
    parseToObjectID
  };
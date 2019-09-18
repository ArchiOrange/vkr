var MySql = require('../db');
MySql.connection();
var db = require('../MongoDB');
var ObjectID = require('mongodb').ObjectID;

exports.getPersonalData = function (login,password,cb) {
    var sqlString = "SELECT * FROM users WHERE login = '"+ login+"' AND password = '"+password+"'";
    MySql.get().query(sqlString, function (err,result) {
  cb(err,result);
    })
}
exports.selectSession = function (id,cb){
  db.get().collection('mySessions').findOne({"session.passport.user": id},function (err,doc){
  cb(err,doc);
  })
}
exports.chekUserStatus = function (id,cb){
  db.get().collection('mySessions').findOne({"session.passport.user.id": id},function (err,doc){
  cb(err,doc);
  })
}

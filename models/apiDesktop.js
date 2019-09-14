var MySql = require('../db');
MySql.connection();
exports.insertIpAndId = function (id,ip,cb) {
var sqlString = "INSERT INTO usersonline (id, ip)VALUES('"+id+"','"+ip+"')" ;
MySql.get().query(sqlString, function (err, result) {
  cb(err,result);
})
}
exports.getUsersOnline = function (cb) {
    var sqlString = "SELECT usersonline.*, users.login FROM chats.usersonline, chats.users WHERE usersonline.id = users.id";
    MySql.get().query(sqlString, function (err,result) {
  cb(err,result);
    })
}

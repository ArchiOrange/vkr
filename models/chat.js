var MySql = require('../db');
MySql.connection();


exports.insertDataUser = function (name,password,cb) {
var sqlString = "INSERT INTO users (login, password)VALUES('"+name+"','"+password+"')" ;
MySql.get().query(sqlString, function (err, result) {
  cb(err,result);
})
}
exports.getPersonalData = function (login,cb) {
    var sqlString = "SELECT * FROM users WHERE login = '"+ login+"'";
    MySql.get().query(sqlString, function (err,result) {
  cb(err,result);
    })
}
exports.searchcontact = function (row,cb){

  var sql = "SELECT id,login,photo FROM chats.users WHERE MATCH (login) AGAINST ('* "+row+" *' IN BOOLEAN MODE)";
  MySql.get().query(sql, function (err,result){
    cb(err,result);
  })
}


exports.availableRooms = function (id,cb) {
  let sql = 'SELECT * from chats.accesslist where partisipant != '+id+' and  room_id in (SELECT room_id FROM chats.accesslist where partisipant = '+id+')';
  MySql.get().query(sql, function (err,result) {
    //console.log(result);
    if(result==undefined || result == 0){result = [{partisipant: null,room_id: null}]}
    cb(err,result);
  })
}
exports.getNamberLastRoom = function (cb){
  let sql = "SELECT room_id FROM chats.accesslist ORDER BY room_id DESC LIMIT 1";
  MySql.get().query(sql, function (err,result) {


  if( result == 0){result = [{room_id: 0}]}
    cb(err,result);
  })
}
exports.insertRoom = function(data,cb){
  var sql = "INSERT INTO chats.accesslist (room_id, partisipant) VALUES ?";
  MySql.get().query(sql,[data],function (err, result) {
    cb(err,result);
  })
}
exports.insertMessage = function(recipient,id_room,sender,textMessage, cb){
  var sqlString = "INSERT INTO message (id_room,sender,textMes,recipient)VALUES('"+id_room+"','"+sender+"','"+textMessage+"','"+recipient+"')" ;
  MySql.get().query(sqlString,function (err, result) {
    cb(err,result);
  })
}
exports.getAllMessage = function (id,cb){
  let sql = "SELECT  message.*, login,users.id,photo, room_id FROM chats.message, chats.accesslist,chats.users where partisipant = users.id and partisipant !='"+id+"' and room_id= id_room  and  room_id in  (SELECT accesslist.room_id FROM chats.accesslist where partisipant != '"+id+"' and room_id in (SELECT room_id FROM chats.accesslist where partisipant = '"+id+"')) order by id_room,dateMessage ";
  MySql.get().query(sql, function (err,result) {
    cb(err,result);
  })
}
exports.getMessageForOneRoom = function (idRoom,cb) {
  let sql = "SELECT * FROM chats.message WHERE id_room = '"+idRoom+"' order by dateMessage";
  MySql.get().query(sql, function (err,result) {
    cb(err,result);
  })
}
exports.getNoReadingMessage = function (id,cb) {
  let sql = "SELECT * FROM chats.message where sender != '"+id+"' and message.status = 0 and   id_room in (SELECT room_id FROM chats.accesslist WHERE partisipant = '"+id+"') order by id_room,dateMessage"
  MySql.get().query(sql, function (err,result) {
    cb(err,result);
  })
}
exports.readingMessages = function (id,idRoom,cb) {
  let sql = "UPDATE message SET status = '1' WHERE status = '0' and id_room = '"+idRoom+"' and sender != '"+id+"'"
  MySql.get().query(sql, function (err,result) {
    cb(err,result);
  })
}

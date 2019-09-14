const Mysql = require('mysql');
exports.connection= function () {

  var MysqlClient = Mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fcirk00',
  database : 'chats'
});

return  MysqlClient.connect();
}
exports.get = function () {
  var MysqlClient = Mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fcirk00',
  database : 'chats'})

  return MysqlClient;
}
exports.options = {
  host     : 'localhost',
  user     : 'root',
  password : 'fcirk00',
  database : 'chats'
};

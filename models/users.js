var MySql = require('../db');
const Mysql2 = require('mysql');
MySql.connection();
exports.insertData= function (data,cb) {
var sqlString = "INSERT INTO demdata ( rang, name, famaly, patronymic, privateNamber, position, conscript, dataContract, nation, schooling, maritalStatus, address, cathedra)" +
 " Values ('" + data.rang + "', '" + data.name + "', '" + data.famaly + "', '" + data.patronnymic + "', '" + data.privateNamber + "', '" + data.position + "', '" + data.conscript + "', '" + 210 + "', '" + data.nation + "', '" + data.schooling + "', '" + data.maritalStatus + "', '" + data.address + "', '" + data.cathedra + "' )";
        MySql.get().query(sqlString,function  (err,result,failed){
          cb(err,result,failed);
        })
}
exports.selected= function (result, cb) {
  var sqlString = "SELECT * FROM demdata WHERE id = '"+result+"'";
  MySql.get().query(sqlString, function (err, result) {
    cb(err,result);
  })
}

//var sql = 'SELECT * FROM customers WHERE address = ' +MySql2.escape(data.inputLogin);
  exports.authentication= function (data,cb) {
    var sqlString = "SELECT * FROM account WHERE login = '"+data.inputLogin+"' and  password = '"+data.inputPassword+"'" ;

    MySql.get().query(sqlString, function (err, result) {
      cb(err,result);
    })

  }

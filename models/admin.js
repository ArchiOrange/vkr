var MySql = require('../db');
MySql.connection();


exports.selectUser = function (column,cb) {
var sqlString = "SELECT * FROM demdata WHERE cathedra = '"+column+"'";

MySql.get().query(sqlString, function (err, result) {
  cb(err,result);
})
}

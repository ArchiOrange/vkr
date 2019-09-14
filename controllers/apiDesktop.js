var API = require('../models/apiDesktop');
var Sha1 = require('sha1');
exports.getUsersOnline = function (req,res) {
  API.getUsersOnline(function (err,result,failed) {
    API.insertIpAndId(req.ip,req.user.id,function (err,result,failed) {

    })
    res.json(result);
  })

}

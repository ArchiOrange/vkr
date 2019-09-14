var MongoClient = require('mongodb').MongoClient;

var state = {
  db:null
};
exports.connect= function (url,done) {
  if (state.db) {
    return done();
  }
  // MongoClient.connect("mongodb://localhost:27017/YourDB", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function (err,db) {
    if (err) {
      return done(err);
    }
    state.db=db.db('session_storage');
    done();
  })

}
exports.get = function () {
  return state.db;
}

var express = require ('express');
var bodyParser = require ('body-parser');
var db = require('./db');
const session = require('express-session');
var  MySQLStore  = require ( 'express-mysql-session') ( session ) ;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./MongoDB');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/session_storage',
  collection: 'mySessions'
});
store.on('error', function(error) {
  console.log(error);
});
const passport = require('passport');
var chatControllers= require('./controllers/chat');
var loginControllers = require('./controllers/login');
var apiDesktopControllers = require('./controllers/apiDesktop')
var app = express();
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'fcirk',
    database: 'chats',
    dialect: "mysql"
};


//incldude/
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public',express.static('public'));
app.use(session({
  secret:'wqJLJI304jlj230-3',
  store: store,
  cookie: {
    path:'/',
    httpOnly:false,
    maxAge:60*60*1000
  },
  resave:true,
  saveUninitialized: false,
  })
)
require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());







//route
app.get('/',loginControllers.geniral);
app.all('/registration',chatControllers.loadRegistration);
app.post('/login',loginControllers.login);
app.get('/logout',loginControllers.logout);
app.all('/index',loginControllers.auth,chatControllers.index);
app.post('/searchcontact',chatControllers.searchcontact);
app.post('/sendMes',loginControllers.auth,chatControllers.findCompanion);
app.get('/exit',loginControllers.loginDesktop);
app.get('/l',loginControllers.auth,chatControllers.l)
//apiDesktop
app.get('/e',loginControllers.auth,apiDesktopControllers.getUsersOnline);

db.connect('mongodb://localhost:27017/myapi', function (err){
  if (err){
  return console.log(err);
  }
  app.listen(3000,function(){
    console.log ('server up');
    })
 })

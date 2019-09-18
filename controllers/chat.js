var Chat= require('../models/chat');
var Login = require('../models/login')
var Sha1 = require('sha1')
exports.loadRegistration = function (req,res) {

  if(req.body.name){
    Chat.getPersonalData(req.body.name,function(err, result, failed) {

    if(result[0] == undefined){
        req.body.password = Sha1(req.body.password);
        Chat.insertDataUser(req.body.name, req.body.password,function(err, result){
        console.log(result,err);
      });
    }
    else {
      res.send('Логин занят');
    }
    })
  }
  else {
    res.render('registration');
  }
}
// exports.insertData = function (req,res) {
//   var data = req.body.result;
//       User.insertData(data,function (err, result, failed) {
//         if (err){
//           console.log(err);
//           return res.sendStatus(500)
//         }
//         res.render('user');
//       })

//}
exports.index = function (req,res){
  var j = 0;
  let contact = [0]
   contact[0].room = null ;

  if(req.body.room){ //if for selectContact
    Chat.getMessageForOneRoom(req.body.room,function (err,result,failed) {
      for (var i = 0; i < result.length; i++) {
        if(result[i].sender == req.user.session.passport.user.id){
          result[i].sender = 'replies'
        }
        else {
          result[i].sender ='sent'
        }
      }
      res.render('dialog',{result});
    })
    Chat.readingMessages(req.user.session.passport.user.id,req.body.room,function (err,result) {
      //console.log(err,result);
    })
  }
else{
  // Chat.availableRooms(req.user.session.passport.user.id, function (err,result,failed) {
  //   console.log(result);
  // })
  Chat.getAllMessage(req.user.session.passport.user.id,function (err,result,failed) {
        if(result==undefined || result == 0){
          console.log('contgggggg');
          res.render('index',{static : {login: req.user.session.passport.user.login,photo :req.user.session.passport.user.photo} });
        }
        else {
          for (var i = 0; i < result.length; i++) {
          if (i== result.length-1) {
            contact[j] = result[i];
            if(contact[j].sender ==req.user.session.passport.user.id){
              contact[j].sender = 'Вы: ';
            }
            else {
              contact[j].sender = '';
            }
            break;
          }
          else  if(result[i].room_id==result[i+1].room_id) {}
          else  {
           contact[j] = result[i];
           if(contact[j].sender == req.user.session.passport.user.id){
             contact[j].sender = 'Вы: ';
           }
           else {
             contact[j].sender = '';
           }
            j++;
          }
        }



        Chat.getMessageForOneRoom(contact[0].room_id,function (err,message,failed) {
          for (var i = 0; i < message.length; i++) {
            if(message[i].sender == req.user.session.passport.user.id){
              message[i].sender= 'replies';
            }
            else {
              message[i].sender= 'sent';
            }
          }
          res.render('index',{message,contact, static : {login: req.user.session.passport.user.login,photo :req.user.session.passport.user.photo, companionLogin : contact[0].login, companionPhoto : contact[0].photo } });

        })
        }

     })
}

 }
exports.searchcontact = function (req,res){
  //console.log(req.body.search);
  Chat.searchcontact(req.body.search,function(err, result, failed) {
    let data = JSON.stringify(result);
    data = JSON.parse(data);
    //res.sendStatus(200);
    res.json(data);
});
}


exports.findCompanion = function (req,res) {
  Chat.availableRooms(req.user.session.passport.user.id,function(err,resultAvailableRooms,failed){
    console.log('controllers',resultAvailableRooms);
    for (var i = 0; i < resultAvailableRooms.length; i++) {
      if (resultAvailableRooms[i].partisipant==req.body.companion){

        Chat.insertMessage(resultAvailableRooms[i].partisipant,resultAvailableRooms[i].room_id,req.user.session.passport.user.id,req.body.textMessage,function (err,resultInsertMessage) {
          console.log(err);
          console.log(req.body.textMessage);
          console.log(req.body.companion);
          res.sendStatus(200);
        })
        console.log(resultAvailableRooms[i].room_id);
        break;
      }
    else if (resultAvailableRooms.partisipant == null) {
      Chat.getNamberLastRoom(function (err,resultGetNamberLastRoom) {
        //console.log(resultGetNamberLastRoom);
        var data = [];
         data[0]= [resultGetNamberLastRoom[0].room_id+1,req.body.companion];
         data[1]= [resultGetNamberLastRoom[0].room_id+1,req.user.session.passport.user.id];
         console.log(data);
        Chat.insertRoom(data,function (err,resultInrestRoom) {
          console.log(err);
        })
        Chat.insertMessage(req.body.companion,resultGetNamberLastRoom[0].room_id+1,req.user.session.passport.user.id,req.body.textMessage,function (err,result) {
          console.log(result);
          res.sendStatus(200)
        })
      })
      break;
    }
    }
  })

}
exports.getNoReadingMessage = function (req,res) {
  Chat.checkReqRTCConection(req.user.session.passport.user.id,function (err,resultcheckReqRTCConection) {
    //console.log('resultcheckReqRTCConection:',resultcheckReqRTCConection);
    if(resultcheckReqRTCConection != 0){
      Chat.delSessionRTC(resultcheckReqRTCConection[0].senderID,resultcheckReqRTCConection[0].receiveID,function (err,result) {
      //  console.log('delSessionRTC err:',err);
      })
    }
    Chat.getNoReadingMessage(req.user.session.passport.user.id,function (err,result) {
      var loadingData = []
      var activeMessage = []
      var j = 1;
      var k = 0;
      var m = 0;
      console.log('userID:',req.user.session.passport.user.id);
      console.log("result::",result);
      if( undefined == result.length){
        console.log('ебаная ошибка');
        console.log(req.user.session.passport.user.id)}
      for (var i = 0; i < result.length; i++) {//0123456789 10 11
        if(i == result.length-1 ||result[i].id_room != result[i+1].id_room){//0123
          loadingData[k] = result[i]
          loadingData[k].contMes = j
          j = 1
          k++;
          if (result[i].id_room==req.query.room) {
            activeMessage[m] = result[i];
            m++;
          }
        }
        else if (result[i].id_room==req.query.room) {
          activeMessage[m] = result[i];
          m++;
          j++;
        }
        else{
          j++;
        }
      }
      res.json({activeMessage:activeMessage,loadingData:loadingData,RTCConection:resultcheckReqRTCConection})
      //console.log("activeMessage:",activeMessage,'loadingData:',loadingData,'RTCConection:',resultcheckReqRTCConection);
    })
  })

}
exports.chekUserStatus = function (req,res) {
  console.log(typeof id);
  Login.chekUserStatus(+req.body.idCompanion,function (err,docs) {
    if(docs!=null){
      Chat.addSessionRTC(req.user.session.passport.user.id,req.body.idCompanion,req.body.unicID,function(err,result) {
        console.log('chekUserStatus:data not inserd',err);
      })
      res.json(true)
    }
    else{
      res.json(false)
    }
  })

}

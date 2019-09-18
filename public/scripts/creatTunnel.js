var globalConn = null
$('#creatTunnel').on('click',function () {
  var peer = null; // own peer object
  var data = {}
  data.unicID = null
  $('#creatTunnel').text('Попытка соединения')
  peer = new Peer();
  peer.on('open', function (id) {
    data.unicID = peer.id
    data.idCompanion = $('.contact.active').attr('data-user-id');
    data = JSON.stringify(data);
    $.ajax({
        url: "/tunnel",
        type: "POST",
        data: data,
        contentType: "application/json",
        success: function (data) {
          if(!data){
            alert('Пользователь не онлайн')
          }
          else {
            }
          }



         });
  });
  peer.on ('connection', function (conn) {
    globalConn  = conn
    conn.on ('data', function (data) {
      console.log ("«Получено»",data);
    });
  });
})

var firstFrend = $('#contacts ul li.contact').first()
var conn = null
var peer = null
var globalConn2 = null
loadNewData()
$(firstFrend).attr('class','contact active');
$('#message').scrollTop($('#message').prop('scrollHeight'));
function loadNewData() {
  $.ajax({
      url: "/newdata?room="+$('.contact.active').attr('data-list-id'),
      type: "GET",
      success: function (data) {
        if (data.RTCConection[0]!= null) {
          var nameSender = $('[data-user-id ='+data.RTCConection[0].senderID+']').find('.name').text()
          let resUser = confirm(data.RTCConection[0].keySender + " Предлагает создать тунель");
          if(resUser){
            if ($('.contact.active').attr('data-user-id')!=data.RTCConection[0].senderID) {
              selectContact()
            }
            peer = new Peer()

          peer.on('open', function (id) {
              // Workaround for peer.reconnect deleting previous id
              if (peer.id === null) {
                  console.log('Received null id from peer open');
                  peer.id = lastPeerId;
              } else {
                  lastPeerId = peer.id;
              }

              console.log('ID: ' + peer.id);
          });
            alert(data.RTCConection[0].keySender)
            join(data.RTCConection[0].keySender)
            $('#warning').css('display','block')
            $('#creatTunnel').text('Создан тунель')
          }
        }
        if(data.loadingData != 0){
          $('#contacts').find('span.contact-status.online').detach()
          $('#contacts').find('.contact').each(function() {
              for (var i = 0; i < data.loadingData.length; i++) {
              }
                for (var i = 0; i < data.loadingData.length; i++) {
                  if($(this).attr('data-list-id')==data.loadingData[i].id_room){
                    $(this).find("div.wrap").prepend('<span class="contact-status online">'+data.loadingData[i].contMes+'</span>')
                  }
                }
                if(data.activeMessage[0].id_room ==$('li.contact.active').attr('data-list-id')){
                  $('ul').find('li.new').detach();
                  for (var i = 0; i < data.activeMessage.length; i++) {

                    $('div#message ul').append('<li  class="sent new "><p>'+data.activeMessage[i].textMes+'</p></li>')

                  }
                }
          })
        }
      }

       });
}
$('#sendRTC').on('click',function () {
console.log(globalConn.open);
//  alert($('script#jquery').attr("src"))
  globalConn.send( 'Hello!');
})
setInterval(loadNewData,5000)
// function setRTC(id) {
//   peer = new Peer({host: 'localhost', port: 9000, path: '/myapp'});
//   alert(id)
//   peer.on('open', function (id) {
//       conn = peer.connect(id, {
//           reliable: true
//       });
//       console.log( 'conn peer on open',conn);
//       console.log('ID: ' + peer.id);
//   });
//   console.log('conn',conn);
//   globalConn2.on('open', function () {
//       console.log("Connected to: " + conn.peer);
//   });
//   globalConn2.on('data', function (data) {
//       console.log(data);
//   });
// }
function join(id) {
    // Close old connection
    if (conn) {
        conn.close();
    }

    // Create connection to destination peer specified in the input field
    conn = peer.connect(id, {
        reliable: true
    });

    conn.on('open', function () {
        console.log("Connected to: " + conn.peer);

        // Check URL params for comamnds that should be sent immediately
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.on('data', function (data) {
        console.log(data)
    });
    conn.on('close', function () {
        console.log('close');
    });
};

var firstFrend = $('#contacts ul li.contact').first()
loadNewData()
$(firstFrend).attr('class','contact active');
$('#message').scrollTop($('#message').prop('scrollHeight'));
function loadNewData() {
  $.ajax({
      url: "/newdata?room="+$('.contact.active').attr('data-list-id'),
      type: "GET",
      success: function (data) {
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
setInterval(loadNewData,5000)

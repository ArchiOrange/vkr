var firstFrend = $('#contacts ul li.contact').first()
$(firstFrend).attr('class','contact active');
$('#message').scrollTop($('#message').prop('scrollHeight'));
$('.modal-footer .btn.btn-primary').on('click',function () {

    $('#exampleModal').modal('toggle');
    let data = {};
    data.textMessage = $('.modal-body textarea').val();
    data.companion = idCompanion;
    $('.modal-body textarea').val('');
    data= JSON.stringify(data);
    $.ajax({
        url: "/sendMes",
        type: "POST",
        data: data,
        contentType: "application/json",
        success: function () {


        }

         });
})
$('button.submit').on('click',function () {
  let data ={}
  data.textMessage = $('div.message-input div input').val();
  data.companion= $('div#contacts ul li.contact.active').attr('data-user-id');
  data= JSON.stringify(data);
  $.ajax({
      url: "/sendMes",
      type: "POST",
      data: data,
      contentType: "application/json",
      success: function () {
      $('div.messages ul').append('<li class="replies"><p>'+$('div.message-input div input').val()+'</p></li>')
      $('div#contacts ul li.contact.active div div p.preview').text('Вы: '+ $('div.message-input div input').val() );
      $('#message').scrollTop($('#message').prop('scrollHeight'));
      $('div.message-input div input').val('');
      }

       });
})

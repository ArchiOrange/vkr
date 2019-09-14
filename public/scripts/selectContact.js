  $('li.contact').on('click', function(){
    var data= {};
    var companion = {}
    companion.ukatel = $(this);
    companion.photo = $(this).find('div img').attr('src');
    companion.name = $(this).find('div div p.name').text()
   data.room = $(this).attr('data-list-id')
data = JSON.stringify(data);
    $.ajax({
        url: "/index",
        type: "POST",
        data: data,
        contentType: "application/json",
        success: function (result) {
          $('div.contact-profile img').attr('src',companion.photo);
          $('div.contact-profile p').text(companion.name);
          $('div#contacts ul li').attr('class',"contact")
          $(companion.ukatel).attr('class','contact active');
          $('div.messages').html(result);
          $('#message').scrollTop($('#message').prop('scrollHeight'));
        }

         });
});

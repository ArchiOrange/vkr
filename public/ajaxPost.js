var data = {};
var i = 0;
$("#button").click(function (e) {
  e.preventDefault();
 $('form').find('input').each(function () {
   data[$(this).attr('name')]= $(this).val();
});
data = JSON.stringify(data);
    $.ajax({
    url: "/registration",
    type: "POST",
    data: data,
    contentType: "application/json",
    success: function () {


    }

     });
     data ={};
   })

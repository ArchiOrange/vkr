var idCompanion ;
$('#search').on('input', function() {

  if ($('#search input').val().length>2) {
    data = {};
    data[$('#search input').attr('name')]= $('#search input').val();
    data = JSON.stringify(data);
    $.ajax({
    url: "/searchcontact",
    type: "POST",
    data: data,
    contentType: "application/json",
    success: function (res) {
      $("#frame #sidepanel #search ul").empty()
      for (var i = 0; i < res.length; i++) {
        $("#frame #sidepanel #search ul").prepend('<li  class="list-group-item">'+res[i].login+'<button contact-photo = "'+res[i].photo+'" contact-id="'+res[i].id+'" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-user-plus fa-fw" aria-hidden="true"></i></button></li>');
      }

    }

  });
}
else {
  $("#frame #sidepanel #search ul").empty()
}
});
$('ul#result').on('click','button',function () {
    $('#exampleModal').attr('contact-id',$(this).attr('contact-id'))
    $('#exampleModal').modal('show');
    idCompanion = $(this).attr('contact-id');
    $("#frame #sidepanel #search ul").empty()
})

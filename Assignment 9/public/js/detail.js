$(function () {
  var OL_Action_Root = "http://" + location.host;
  $('.logout').click(function () {
    $.ajax({
        url: OL_Action_Root + "/req_logout",
        dataType: 'json',
        cache: false,
        timeout: 5000,
        type: "POST",
        success: function (data) {
          console.log('1');
          $('.boarder').addClass('hidden');
          $('.formTitle').addClass('hidden');
          $('.logout').addClass('hidden');
          $('.data').addClass('hidden');
          $('.success').addClass('shown');
          setTimeout(function () {
            window.location.href = OL_Action_Root;
          }, 3000);
        },
        error: function(err){
          console.log(err);
        }
    });
    return false;
  })
});
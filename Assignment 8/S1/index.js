$(function() {
  function init() {
    $('.unread').addClass('hidden');
    $('#info-bar').removeClass('enable').addClass('disable');
    $('.result').addClass('hidden');
    $('.button').removeClass('disable').addClass('enable').children().each(function(){
      this.textContent = '';
    });
  };

  function ingameInit() {
    $('.button').removeClass('disable').addClass('enable');
  }

  function disable() {
    init();
    $('#info-bar').removeClass('enable').addClass('disable');
    $('.button').removeClass('enable').addClass('disable');
  };

  init();

  $('#button').mouseleave(function() {
    disable();
  });

  $('#button').mouseenter(function() {
    init();
  });

  $('.button.enable').click(function() {
    if ($(this).hasClass('enable') && $(this).children()[0].textContent != '...')
      $.ajax({
        url: "http://localhost:3000",
        type: "get",
        timeout: "5000",
        context: this,
        beforeSend: function() {
          if ($('.enable').length == $('.unread').not('.hidden').length) {
            $('.unread').addClass('hidden');
            $('.result').addClass('hidden');
          }
          setTimeout(()=> {
            $(this).children()[0].textContent = "...";
            $(this).children().removeClass('hidden');
            $('.button.enable').not(this).removeClass('enable').addClass('disable');
          }, 50); 
        },
        success: function (data) {
          if (!$(this).children().hasClass('hidden')) {
            $(this).children()[0].textContent = data;
            $('.unread.hidden').parent().removeClass('disable').addClass('enable');
            $(this).removeClass('enable').addClass('disable');
            if ($('.button.disable').length == 5) {
              var datas = $('.unread'), result = $('.result');
              result[0].textContent = 0;
              for (var i = 0; i < datas.length; ++i) {
                result[0].textContent = result[0].textContent * 1 + datas[i].textContent * 1;
              }
              result.parent().removeClass('disable').addClass('enable');
            }
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
        }
      }) 
    });

  $('#info-bar').click(function() {
    if ($(this).hasClass('enable')) {
      $(this).removeClass('enable').addClass('disable')
        .children().removeClass('hidden');
      ingameInit();
    }
  });
  
});
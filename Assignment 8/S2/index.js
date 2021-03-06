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
    $(document).off('ajaxComplete');
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
        context: this,
        timeout: '10000',
        beforeSend: function() {
          if ($('.enable').length == $('.unread').not('.hidden').length) {
            $('.unread').addClass('hidden');
            $('.result').addClass('hidden');
          }
          setTimeout(()=> {
            $(this).children()[0].textContent = "...";
            $(this).children().removeClass('hidden');
            $('.button.enable').not(this).removeClass('enable').addClass('disable');
          }, 0); 
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

  $('.apb').click(function() {
    $(document).on('ajaxComplete', function() {
      if ($('.button.enable').length != 0) {
        $('.button.enable')[0].click();
      }
      else {
        $('#info-bar')[0].click();
        $(document).off('ajaxComplete');
      }
    });
    if ($('.button.enable').length != 0) {
      $('.button.enable')[0].click();
    }
    else {
      $('#info-bar')[0].click();
      $(document).off('ajaxComplete');
    }
  });
  
});
$(function () {
  function init() {
    $('.unread').addClass('hidden');
    $('#info-bar').removeClass('enable').addClass('disable');
    $('.result').addClass('hidden');
    $('.button').removeClass('disable').addClass('enable').children().each(function () {
      this.textContent = '';
    });
    $('.messageBoard')[0].textContent = '';
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

  $('#button').mouseleave(function () {
    disable();
  });

  $('#button').mouseenter(function () {
    init();
  });

  function AHandler(currentSum, handles, callback) {
    if ($('.mask.enable').click().length != 0)
      $(document).one('ajaxComplete', function () {
        if (Math.round(Math.random()) == 0) {
          //error here
         
          callback({
            "currentSum": currentSum + $('.mask span')[0].textContent * 1,
            "message": "这不是个天大的秘密"
          }, null, handles);
        }
        else {
          //normal here
          displayMsg("这是个天大的秘密");
         
          if (handles.length == 0)
           return;
          else
            callback(undefined, currentSum + $('.mask span')[0].textContent * 1, handles);
        }
      });
  }

  function BHandler(currentSum, handles, callback) {
    if ($('.history.enable').click().length != 0)
      $(document).one('ajaxComplete', function () {
        if (Math.round(Math.random()) == 0) {
          //error here
         
          callback({
            "currentSum": currentSum + $('.history span')[0].textContent * 1,
            "message": "我知道"
          }, null, handles);
        }
        else {
          //normal here
          displayMsg("我不知道");
         
          if (handles.length == 0)
            return;
          else
          callback(undefined, currentSum + $('.history span')[0].textContent * 1, handles);
        }
      });
  }

  function CHandler(currentSum, handles, callback) {
    if ($('.message.enable').click().length != 0)
      $(document).one('ajaxComplete', function () {
        if (Math.round(Math.random()) == 0) {
          //error here
         
          callback({
            "currentSum": currentSum + $('.message span')[0].textContent * 1,
            "message": "你知道"
          }, null, handles);
        }
        else {
          //normal here
          displayMsg("你不知道");
         
          if (handles.length == 0)
            return;
          else
            callback(undefined, currentSum + $('.message span')[0].textContent * 1, handles);
        }
      });
  }
  function DHandler(currentSum, handles, callback) {
    if ($('.setting.enable').click().length != 0)
      $(document).one('ajaxComplete', function () {
        if (Math.round(Math.random()) == 0) {
          //error here
         
          callback({
            "currentSum": currentSum + $('.setting span')[0].textContent * 1,
            "message": "他知道"
          }, null, handles);
        }
        else {
          //normal here
         
          displayMsg("他不知道");
          if (handles.length == 0)
            return;
          else
            callback(undefined, currentSum + $('.setting span')[0].textContent * 1, handles);
        }
      });
  }

  function EHandler(currentSum, handles, callback) {
    if ($('.sign.enable').click().length != 0)
      $(document).one('ajaxComplete', function () {
        if (Math.round(Math.random()) == 0) {
          //error here
         
          callback({
            "currentSum": currentSum + $('.sign span')[0].textContent * 1,
            "message": "才不怪"
          }, null, handles);
        }
        else {
          //normal here
          displayMsg("才怪");
         
          if (handles.length == 0)
            return;
          else
            callback(undefined, currentSum + $('.sign span')[0].textContent * 1, handles);
        }
      });
  }

  function bubbleHandler(currentSum, handles, callback) {
    $('#info-bar').click();
    if (Math.round(Math.random()) == 0) {
      //error here   
      callback({
        "currentSum": currentSum,
        "message": '楼主异步调用战斗力超强，目测不低于' + currentSum
      }, null, handles);
    }
    else {
      //normal here
      displayMsg('楼主异步调用战斗力感人，目测不超过' + currentSum);
      callback(undefined, currentSum, handles);
    }
  }

  function displayMsg(msg) {
    $('.messageBoard')[0].textContent = msg;
  }

  function getHandler(index) {
    switch (index) {
      case '0':
        return AHandler;
      case '1':
        return BHandler;
      case '2':
        return CHandler;
      case '3':
        return DHandler;
      case '4':
        return EHandler;
      case 'x':
        return bubbleHandler;
    }
  }

  $('#info-bar').click(function () {
    if ($(this).hasClass('enable')) {
      $(this).removeClass('enable').addClass('disable')
        .children().removeClass('hidden');
      ingameInit();
    }
  });

  $('.apb').click(function () {
    var temp = '', handles = '';

    if ($('.button.enable').length != 5)
      return;

    while (handles.length != 5) {
      temp = Math.round(Math.random() * 4) + '';
      if (handles.indexOf(temp) == -1) {
        handles += temp;
      }
    }

    handles += 'x';
    handleCaller(undefined, 0, handles);
  });

  function handleCaller(error, currentSum, handles) {
    if (error !== undefined) {
      displayMsg(error.message);
      currentSum = error.currentSum;
    }
   
    if (handles.length == 0)
      return;
    else
      getHandler(handles.charAt(0))(currentSum, handles.substr(1), handleCaller);
  }

  $('.button.enable').click(function () {
    if ($(this).hasClass('enable') && $(this).children()[0].textContent != '...')
      $.ajax({
        url: "http://localhost:3000",
        type: "get",
        timeout: "5000",
        context: this,
        cache: false,
        beforeSend: function () {
          if ($('.enable').length == $('.unread').not('.hidden').length) {
            $('.unread').addClass('hidden');
            $('.result').addClass('hidden');
            $('.messageBoard')[0].textContent = '';
          }
          setTimeout(() => {
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
                if (datas[i].textContent == '...')
                  return;
                result[0].textContent = result[0].textContent * 1 + datas[i].textContent * 1;
              }
              result.parent().removeClass('disable').addClass('enable');
            }
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
        }
      })
  });

});

//  Math.round(Math.random() * limit)
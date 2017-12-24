$(function () {
  var OL_Action_Root = location.host;
  var userName = $("input[name='username']")[0];
  var passWord = $("input[name='password']")[0];
  var inputs = $('.input__label');
  var msgs = $('.msg'), contents = $('.msgWords');

  $('.input__field').focus(function () {
    $(this).parent().addClass('input__filled');
  });

  $('.input__field').blur(function () {
    if (this.value == "") {
      $(this).parent().removeClass('input__filled');
    }
    check(this.id.substr(this.id.length - 1) - 1);
  });

  $('.signup').click(function () {
    window.location.href = OL_Action_Root + '/regist';
  });

  $('.submit').click(function () {
    init();
    if (check())
      $.ajax({
        data: {
          "username": userName.value,
          "password": passWord.value
        },
        url: OL_Action_Root + "/req_login",
        dataType: 'json',
        cache: false,
        timeout: 5000,
        type: "POST",
        success: function (data) {
          if (data.status == 'success') {
            var username = data.username;
            $('form').addClass('hidden');
            $('.success').addClass('shown');
            setTimeout(function () {
              window.location.href = OL_Action_Root + '?username=' + username;
            }, 3000);
          }
          else{
            if (data.nouser){
              setError(0, 'No such user.');
            }
            else {
              setError(1, 'Incorrect password.')
            }
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
        }
      });

    return false;
  })

  function init() {
    inputs.removeClass('error');
    msgs.removeClass('errorMsg');
  }

  function check(index) {
    var flag = true;
    /* Username */
    if (index == undefined || index == 0) {
      if (userName.value.length == 0) {
        setError(0, "You cannot sign in without a username.");
        flag = false;
      }
      else {
        inputs[0].className = "input__label";
        $(msgs[0]).removeClass('errorMsg');
      }
    }

    if (index == undefined || index == 4) {
      if (passWord.value.length == 0) {
        setError(1, "Please fill in the password.");
        flag = false;
      }
      else {
        inputs[1].className = "input__label";
        $(msgs[1]).removeClass('errorMsg');
      }
    }

    return flag
  }

  function setError(target, message) {
    inputs[target].className = "input__label error";
    $(msgs[target]).removeClass('errorMsg');
    setTimeout(function () {
      contents[target].textContent = message;
      $(msgs[target]).addClass('errorMsg');
    }, 200);
  }

});
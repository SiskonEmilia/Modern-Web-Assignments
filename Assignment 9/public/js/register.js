$(function () {
  var OL_Action_Root = "http://" + location.host;
  var userName = $("input[name='username']")[0];
  var stuId = $("input[name='stuid']")[0];
  var telNum = $("input[name='tel']")[0];
  var eMail = $("input[name='email']")[0];
  var passWord = $("input[name='password']")[0];
  var rePassWord = $("input[name='repassword']")[0];
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

  $('.reset').click(function () {
    $('.input').removeClass('input__filled');
    init();
  });

  $('.submit').click(function () {
    init();
    if (check())
      $.ajax({
        data: {
          "username": userName.value,
          "stuid": stuId.value,
          "tel": telNum.value,
          "email": eMail.value,
          "password": passWord.value
        },
        url: OL_Action_Root + "/req_reg",
        dataType: 'json',
        cache: false,
        timeout: 5000,
        type: "POST",
        success: function (data) {
          if (data.status == 'error') {
            if (data['username']) {
              inputs[0].className = "input__label error";
              setTimeout(function () {
                contents[0].textContent = "Username existed!";
                $(msgs[0]).addClass('errorMsg');
              }, 200);
              flag = false;
            }
            if (data['stuid']) {
              inputs[1].className = "input__label error";
              setTimeout(function () {
                contents[1].textContent = "Student ID existed!";
                $(msgs[1]).addClass('errorMsg');
              }, 200);
              flag = false;
            }
            if (data['tel']) {
              inputs[2].className = "input__label error";
              setTimeout(function () {
                contents[2].textContent = "Telephone number existed!";
                $(msgs[2]).addClass('errorMsg');
              }, 200);
              flag = false;
            }
            if (data['email']) {
              inputs[3].className = "input__label error";
              setTimeout(function () {
                contents[3].textContent = "Email address existed!";
                $(msgs[3]).addClass('errorMsg');
              }, 200);
              flag = false;
            }
          }
          else {
            $('form').addClass('hidden');
            $('.success').addClass('shown');
            setTimeout(function () {
              window.location.href = OL_Action_Root + '?username=' + data.username;
            }, 3000);
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
      if (userName.value.length < 6 || userName.value.length > 18) {
        setError(0, "The length of your username must be between 6 and 18.");
        flag = false;
      }
      else if (!/[a-zA-Z]/.test(userName.value.charAt(0))) {
        setError(0, "Username must begin with an English character.");
        flag = false;
      }
      else if (!/^[a-zA-Z0-9_]+$/.test(userName.value)) {
        setError(0, "Username must consist of English words, numbers and underline.");
        flag = false;
      }
      else {
        inputs[0].className = "input__label";
        $(msgs[0]).removeClass('errorMsg');
      }
    }

    /* Student ID */
    if (index == undefined || index == 1) {
      if (/0/.test(stuId.value.charAt(0))) {
        setError(1, "Student ID cannot begin with zero.");
        flag = false;
      }
      else if (!/^\d+$/.test(stuId.value)) {
        setError(1, "Student ID can only consist of numbers.");
        flag = false;
      }
      else if (stuId.value.length != 8) {
        setError(1, "Student ID must be 8-words long.");
        flag = false;
      }
      else {
        inputs[1].className = "input__label";
        $(msgs[1]).removeClass('errorMsg');
      }
    }

    /* Telephone Number */
    if (index == undefined || index == 2) {
      if (/0/.test(telNum.value.charAt(0))) {
        setError(2, "Telephone number cannot begin with zero.");
        flag = false;
      }
      else if (!/^\d+$/.test(telNum.value)) {
        setError(2, "Telephone number can only consist of numbers.");
        flag = false;
      }
      else if (telNum.value.length != 11) {
        setError(2, "Telephone number must be 11-words long.");
        flag = false;
      }
      else {
        inputs[2].className = "input__label";
        $(msgs[2]).removeClass('errorMsg');
      }
    }

    if (index == undefined || index == 3) {
      if (eMail.value.length == 0){
        setError(3, "Your email address cannot be empty.");
        flag = false;
      }
      else if (!/^[a-zA-Z\d_\-.@]+$/.test(eMail.value)) {
        setError(3, "Your email address cannot contain strange characters.");
        flag = false;
      }
      else if (!/^[A-Za-z\d]+[A-Za-z\d@.\-_]+[A-Za-z\d]$/
        .test(eMail.value)) {
        setError(3, "Email address cannot begin or end with . _ or -.");
        flag = false;
      }
      else if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
        .test(eMail.value)) {
        setError(3, "No or too many '@', or incorrect host name is included.");
        flag = false;
      }
      else {
        inputs[3].className = "input__label";
        $(msgs[3]).removeClass('errorMsg');
      }
    }

    if (index == undefined || index == 4) {
      if (passWord.value.length < 6 || passWord.value.length > 12) {
        setError(4, "The length of your password should be 6 to 12");
        flag = false;
      }
      else if (!/^[\da-zA-Z_\-]{6,12}$/
      .test(passWord.value)) {
        setError(4, "Your password should only contain English characters, digitals, _ and -.");
        flag = false;
      }
      else {
        inputs[4].className = "input__label";
        $(msgs[4]).removeClass('errorMsg');
      }
    }

    if (index == undefined || index == 5 || index == 4) {
      if (rePassWord.value != passWord.value) {
        setError(5, "What you typed in is not the same as you typed in the Pass.");
        flag = false;
      }
      else {
        inputs[5].className = "input__label";
        $(msgs[5]).removeClass('errorMsg');
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
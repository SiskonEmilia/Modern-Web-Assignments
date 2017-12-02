const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
var userData = {};

var server = http.createServer(function (req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET');

  var pathname = url.parse(req.url).pathname;

  switch(pathname){
    case '': case '/':
      if (!getDetail(req, res))
        sendFile(res, '../public/html/index.html', '.html');
    break;

    case '/sign_req':
      sign_req(req, res);
    break;

    default:
      if (pathname.substr(0, 7) == '/public') {
        var extname = path.extname(pathname);
        if (extname == '') {
          sendFile(res, '../public/html/index.html', '.html');
        }
        else {
          sendFile(res, '..' + pathname, extname);
        }
      }
      else {
        sendFile(res, '../public/html/index.html', '.html');
      }
    break;
  }

});

server.listen(8000, "localhost", function () {
  console.log('Start listening at http://localhost:8000');
});

function sign_req(req, res) {
  
  var stuInfo;
  
  req.on('data', function (data) {
    stuInfo += data;
  });

  req.on('end', function () { 
    res.writeHead(200, {'Content-Type': 'application/json'});
    stuInfo = stuInfo.substr(9);
    var data = querystring.parse(stuInfo);
    var username = data['username'], stuid = data['stuid'],
      tel = data['tel'], email = data['email'];
    var flag = true;

    res.write(
      '{"username": ' + (flag &= checkUser(username)) + ',' +
      '"stuid": ' + (flag &= checkId(stuid)) + ',' +
      '"tel": ' + (flag &= checkTel(tel)) + ',' +
      '"email": ' + (flag &= checkMail(email)) + '}');

    if (flag) 
      createUser(username, stuid, tel, email);

    res.end();
  });

  console.log('Someone is tring to sign up.');
}

function checkUser(username) {
  for (var i in userData)
    if (userData[i]['username'] == username)
      return false;
  return true;
}

function checkId(stuid) {
  for (var i in userData)
    if (userData[i]['stuid'] == stuid)
      return false;
  return true;
}

function checkTel(tel) {
  for (var i in userData)
    if (userData[i]['tel'] == tel)
      return false;
  return true;
}

function checkMail(mail) {
  for (var i in userData)
    if (userData[i]['mail'] == mail)
      return false;
  return true;
}

function createUser(username, stuid, tel, mail) {
  userData[username] = {
    "username": username,
    "stuid": stuid,
    "tel": tel,
    "mail": mail
  };
  console.log('User created! Present user data:\n' + userData);
}

function sendFile(res, path, fileType) {
  fs.readFile(path, function(err, data) {
    if (err) {
      sendFile(res, '../public/html/index.html', '.html');
    }
    else {
      console.log('Sending file: ' + path);

      switch(fileType) {
        case '.html':
          fileType = 'text/html';
        break;

        case '.css':
          fileType = 'text/css';
        break;

        case '.js':
          fileType = 'application/x-javascript';
        break;

        case '.jpg':
          fileType = 'image/jpeg';
        break;

        case '.png':
          fileType = 'image/png';
        break;

        default:
        break;
      }

      res.writeHead(200, {'Content-Type': fileType});
      res.write(data);
      res.end();
    }
  });
}

function getDetail(req, res) {
  var args = url.parse(req.url, true).query;
  for (var i in args) {
    if (i != 'username')
      return false;
  }
  if (userData[args['username']] == undefined)
    return false;
  fs.readFile('../public/html/Detail.html', function(err, data) {
    var template = data.toString();
    template = template.replace(/{username}/g, userData[args['username']]['username']);
    template = template.replace(/{stuid}/g, userData[args['username']]['stuid']);
    template = template.replace(/{tel}/g, userData[args['username']]['tel']);
    template = template.replace(/{email}/g, userData[args['username']]['mail']);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(template);
    res.end();
  });
  return true;
}
var crypto = require('crypto'),
  User = require('../models/user');


/* GET home page. */

module.exports = function(app) {

  app.get('/', function(req, res, next) {
    if (req.query.username != undefined) {
      var errorMsg = "";
      if (!req.session.user || req.session.user == null) {
        console.log('Haven\'t logged in');
        res.render('signIn');
        return;
      }
      if(req.session.user.username != req.query.username){
        errorMsg = "You can only view your own detail.";
      }
      console.log('Show detail');
      User.get(req.session.user, function(err, user, repeated) {
        if (err) {
          errorMsg = "Some error occured!";
          res.status(500).type('text').end('Error while getting your detail.');
          console.log(err);
          return;
        }
        
        res.locals.user = {
          username: user.username,
          email: user.email,
          tel: user.tel,
          stuid: user.stuid
        };
        res.locals.errorMsg = errorMsg;
        res.render('detail');
      });
    }
    else if (req.session.user){
      User.get(req.session.user, function(err, user, repeated) {
        if (err) {
          console.log(err);
          errorMsg = "Some error occured!";
          res.status(500).type('text').end('Error while getting info')
          return;
        }
        if (user){
          console.log('Have logged in, show detail')
          res.locals.user = user;
          res.locals.errorMsg = ""
          res.render('detail');
        }
        else {
          console.log('User deleted, reset session');
          req.session.user = null;
          res.render('signIn');
        }
      });
    }
    else
      res.render('signIn');
  });

  app.get('/regist', function(req, res, next) {
    console.log('Someone is registing')
    res.render('register');
  });

  app.post('/req_reg', function(req, res) {
    var username = req.body.username,
      password = req.body.password,
      stuid = req.body.stuid,
      email = req.body.email,
      tel = req.body.tel;
    var md5 = crypto.createHash('md5');
    password = md5.update(req.body.password).digest('hex');

    var newUser = new User({
      username: username,
      password: password,
      stuid: stuid,
      email: email,
      tel, tel
    });

    User.get({
      username: username,
      password: password,
      stuid: stuid,
      email: email,
      tel, tel
    }, function(err, user, repeated) {
      if (err) {
        // error
        res.status(500).end();
        return;
      }
      if (user) {
        // repeated register
        repeated.status = 'error';
        res.status(200).json(repeated).end();
        return;
      }

      console.log(newUser);
      
      newUser.save(function (err, user) {
        if (err) {
          // error
          res.status(500).end();
          return;
        }
        // Successfully register
        console.log(user);
        req.session.user = user;
        res.status(200).json({
          status: 'success',
          username: user.username
        }).end();
        return;

      })

    })

  });

  app.post('/req_logout', function(req, res) {
    req.session.user = null;
    res.status(200).type('json').json({}).end();
  })

  app.post('/req_login', function(req, res) {
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    User.get(req.body, function(err, user, repeated) {
      
      if (!user) {
        res.status(200).type('json').json({
          status: 'error',
          nouser: true,
          wrongpass: false
        }).end();
        return;
      }
      if (user.password != password) {
        res.status(200).type('json').json({
          status: 'error',
          nouser: false,
          wrongpass: true
        }).end();
        return;
      }

      req.session.user = user;
      res.status(200).type('json').json({
        status: 'success',
        username: req.body.username
      }).end();
    });
  })

  app.use(function(req, res, next) {
    var err = new Error('404-你来到了没有网页的荒原');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
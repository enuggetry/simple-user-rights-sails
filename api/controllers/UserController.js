var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  index: function(req, res, next) {
    console.log("UserController.index was called");

    User.find().exec(function (err, users){
      if (err) {
          console.log(err);
          return next(err);
      }
      console.log(users);
      res.view('users',
      {
          'users': users
      });
    });

  },

  create: function (req, res, next) {
    console.log("UserController.create was called");

    var userJSON = {
      username: req.param('username'),
      email: req.param('email'),
      password: req.param('password'),
      rights: '10'
    };

    // the register method is defined in sails-auth/services/protocols/local.js
    sails.services.passport.protocols.local.register(userJSON, function (err, user) {
      if (err)
        return res.negotiate(err);

      sails.models.passport.findOne(user.id).exec(function (err, passport){
          if (err) {
            console.log(err);
            return res.badRequest(err);
          }

          req.session.authenticated = true;
          req.session.passport = passport;

          return sails.controllers.homepage.index(req, res, next);
        });
    });

  },

  update: function (req, res) {
    console.log("UserController.update was called");

    User.findOne(req.body.id).exec(function (err, user) {
      if(err) {
        console.log(err);
        return res.badRequest(err);
      }

      if(req.param('username'))
        user.username = req.param('username');
      if(req.param('email'))
        user.email = req.param('email');
      if(req.param('password'))
        user.password = req.param('password');
      if(req.param('rights'))
        user.rights = req.param('rights');

      user.save(function (err) {
        if(err) {
          console.log(err);
          return res.badRequest(err);
        } else {
            req.send(user);
        }
      });
    });
  }

});

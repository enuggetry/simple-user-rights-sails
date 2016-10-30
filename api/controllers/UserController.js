var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  create: function (req, res, next) {
    console.log("UserController.create was called");

    // the register method is defined in sails-auth/services/protocols/local.js
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err)
        return res.negotiate(err);

      sails.models.passport.findOne(user.id).exec(function (err, passport){
          if (err) {
            console.log(err);
          }

          req.session.authenticated = true;
          req.session.passport = passport;

          return sails.controllers.homepage.index(req, res, next);
        });
    });

  },

});

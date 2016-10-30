/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  var adminUser = {
    username: 'rsibanez89',
    email: 'rsibanez89@gmail.com',
    password: 'Rsibanez89',
    rights: '0'
  };

  sails.services.passport.protocols.local.register(adminUser, function (err, user) {
    if (err) {
      console.log(err);
    }
    else
      sails.log.info('user', user, 'admin created successfully');
  });

  var moderatorUser = {
    username: 'moderatorUser',
    email: 'moderator@user.com',
    password: '1moderator+',
    rights: '1'
  };

  sails.services.passport.protocols.local.register(moderatorUser, function (err, user) {
    if (err) {
      console.log(err);
    }
    else
      sails.log.info('user', user, 'moderator created successfully');
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

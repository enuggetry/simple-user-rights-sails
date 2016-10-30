/*
    This policy is particular for this application.
    Consider that regular users can post up to 3 messages.
    User with rights level lower than 10 can post as many message as they want.
*/

module.exports = function(req, res, next) {

  if (req.user.rights < 10) {
    return next();
  }

  User.findOne(req.user.id).populateAll().exec(function (err, user){
    if (err) {
      console.log(err);
      return res.badRequest(err);
    }

    if (user.messages.length < 3) {
      return next();
    }

    return res.forbidden('You have reached your post limit (pay more to keep posting)');
  });

};

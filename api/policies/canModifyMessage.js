/*
    This policy is particular for this application.
    Consider that just the owner of the message can delete or modify the message.
    User with rights level lower than 10 can also delete or modify the message.
*/

module.exports = function(req, res, next) {

  if (req.user.rights < 10) {
    return next();
  }

  Message.findOne(req.param('id')).populate('author').exec(function (err, message){
    if (err) {
      console.log(err);
      return res.badRequest(err);
    }

    if (message.author.email != req.user.email) {
      // User is not allowed
      return res.forbidden('You can remove just your own messages ');
    }
    return next();
  });

};

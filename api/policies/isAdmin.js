/*
    This policy consider that all the user with rights lower than 10 have admin level
*/

module.exports = function(req, res, next) {

  if (req.user.rights < 10) {
    return next();
  }

  // User is not allowed
  return res.forbidden('You are not permitted to perform this action.');
};

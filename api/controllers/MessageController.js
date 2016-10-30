/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res){
    console.log("MessageController.create was called");
    var messagesJSON = {
        author: req.user.id,
        content: req.param('content'),
    };

    Message.create(messagesJSON, function (err, message) {
      if (err) {
        console.log(err);
				return res.badRequest(err);
      }
      return res.redirect('homepage');
    });
	},

	destroy: function (req, res, next) {
    console.log("MessageController.destroy was called");

		Message.destroy(req.param('id'), function (err) {
      if (err) {
        console.log(err);
				return res.badRequest(err);
      }
      res.redirect('homepage');
    });
	}

};

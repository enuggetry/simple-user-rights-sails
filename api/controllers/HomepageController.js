/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {
    console.log("HomepageController  was called");

		Message.find().populate('author').exec(function (err, messages){
			if (err) {
				console.log(err);
				return res.badRequest(err);
			}
			res.view('homepage',
			{
					'messages': messages
			});
		});

	}

};

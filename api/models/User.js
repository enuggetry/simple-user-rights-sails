// api/models/User.js

var _ = require('lodash');
var _super = require('sails-auth/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
  attributes: {
        email: { required : true },
        messages: {
          collection: 'message',
          via: 'author'
        },
        rights: { //ADMIN = 0; MODERATOR=1; USER=10
          type: 'integer',
          required : true
        }
  }

});

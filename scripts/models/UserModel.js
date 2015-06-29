var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		username: '',
		password: '',
		email: '',
		avatar: 'http://androidforums.com/styles/androidforumsv3/xenforo/avatars/avatar_l.png'
	},
	parseClassName: '_User',
	isUser: true,
	idAttribute: 'objectId'
});




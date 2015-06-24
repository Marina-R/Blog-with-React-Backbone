var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		username: '',
		password: '',
		email: ''
	},
	parseClassName: '_User',
	isUser: true,
	idAttribute: 'objectId'
});




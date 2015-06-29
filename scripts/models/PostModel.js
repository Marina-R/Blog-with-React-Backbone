var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		userId: '',
		userAvatar: '',
		title: '',
		body: '',
		category: ''
	},
	parseClassName: 'Post',
	isPost: true,
	idAttribute: 'objectId',

	validate: function(attr) {
		if(!attr.title) {
			return 'Please create a title';
		} else if(!attr.body) {
			return 'Please enter your post';
		} 
		return false;
	}
});

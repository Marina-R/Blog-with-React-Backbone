var React = require('react');
var PostModel = require('../models/PostModel');
var parseSettings = require('../config/parse');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Collection.extend({
	model: PostModel,
	parseClassName: 'Post'
});

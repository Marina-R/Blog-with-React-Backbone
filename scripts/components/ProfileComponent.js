var React = require('react');
var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<h3>Welcome to my App!</h3>
			</div>
		)
	}
});
var React = require('react');
var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var UserModel = require('../models/UserModel');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<h3>Welcome to my first parse App</h3>
				<a href='#' ref='login' onClick={this.gotoLogin}>Log In</a><br/>
				<a href='#' ref='register' onClick={this.gotoRegister}>Register</a>
			</div>
		)
	},
	gotoLogin: function(e) {
		e.preventDefault();
		this.props.app.navigate('login', {trigger: true});

	},
	gotoRegister: function(e) {
		e.preventDefault();
		this.props.app.navigate('register', {trigger: true});
	}
});

var React = require('react');
var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var UserModel = require('../models/UserModel');
var validator = require('validator');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: {}
		};
	},
	render: function () {
		return (
			<div>
				<form ref='loginForm' onSubmit={this.login}> 
					<input type='text' ref='username' placeholder='Please enter your username' /><br/>
					<div className='error' ref='usernameError'>{this.state.data.username}</div>
					<input type='password' ref='password' placeholder='Please enter your password' /><br/>
					<div className='error' ref='passwordError'>{this.state.data.password}</div>
					<button type='submit' ref='loginBtn'>Log In</button>
				</form>		
			</div>
		)
	},
	hasError: function(error) {
		for(var i in error) {
			return true;
		}
		return false;
	},
	login: function(e) {
		e.preventDefault();
		var app = this.props.app;
		var self = this;
		var error = {};

		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;

		if(!username && !password) {
			error.username = 'Please enter your username';
			error.password = 'Please enter your password';
		} else if(!password) {
			error.password = 'Please enter your password';
		} else if(!validator.isLength(password, 6)) {
			error.password = 'Password should be at least 6 characters length';
		}

		this.setState({data: error});
		
		var user = new UserModel();
		user.login({
			username: this.refs.username.getDOMNode().value,
			password: this.refs.password.getDOMNode().value
		}, {
			success: function(userModel) {
				app.navigate('profile', {trigger: true});
			},
			error: function(userModel, response) {
				if(response.responseJSON.code == 101) {
					error.password = 'Invalid login parameters';
				}
				self.setState({data: error});
			}
		})
	}
});
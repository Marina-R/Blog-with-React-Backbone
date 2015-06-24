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
				<form ref='registerForm' onSubmit={this.register}> 
					<input type='text' ref='username' placeholder='Please enter your username' /><br/>
					<div  className='error' ref='usernameError'>{this.state.data.username}</div>
					<input type='password' ref='password' placeholder='Please enter your password' /><br/>
					<div className='error' ref='passwordError'>{this.state.data.password}</div>
					<input type='email' ref='email' placeholder='Please enter your email' /><br/>
					<div className='error' ref='emailError'>{this.state.data.email}</div>
					<button type='submit' ref='loginBtn'>Register</button>
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
	register: function(e) {
		e.preventDefault();
		var self = this;
		var app = this.props.app;
		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;
		var email = this.refs.email.getDOMNode().value;
		
		var user = new UserModel({
			username: username,
			password: password,
			email: email
		});

		var error = {};

		if(!user.attributes.username && !user.attributes.password && !user.attributes.email) {
			error.username = 'Please enter your username';
			error.password = 'Please enter your password';
			error.email = 'Please enter your email';
		} else if(!user.attributes.password) {
			error.password = 'Please enter your password';
		} else if(!validator.isLength(user.attributes.password, 6)) {
			error.password = 'Password should be at least 6 characters length';
		} else if(!user.attributes.email) {
			error.email = 'Please enter your email';
		} else if(!validator.isEmail(user.attributes.email)) {
			error.email = 'Email should be valid';
		}

		this.setState({data: error});

		if(!this.hasError(error)) { 
			user.save(null, {
				success: function(userModel) {
					app.navigate('profile', {trigger: true});
				},
				error: function(userModel, response) {
					if(response.responseJSON.code == 202) {
						error.username = 'Username ' + username + ' has already been taken';
					} else if(response.responseJSON.code == 203) {
						console.log(response.responseJSON)
						error.email = 'The email address ' + email + ' has already been taken';
					}
					self.setState({data: error});
				}
			})
		}
	}
});
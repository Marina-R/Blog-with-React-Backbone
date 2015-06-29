var React = require('react');
var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var validator = require('validator');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: {}
		};
	},
	render: function () {
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive",
			fontSize: '45px'
		};

		return (
			<div className='login-form'>
				<h1 style={titleStyle}>Log In</h1>
				<form  className='form' ref='loginForm' onSubmit={this.login}>
					<div className='form-group '>
						<label for="exampleInputEmail1">Username</label>
						<input type="text" ref='username' className="form-control" id="exampleInputEmail1" placeholder="Plese enter your username" />
						<div className='error' ref='usernameError'>{this.state.data.username}</div>
					</div>
					<div className="form-group " >
						<label for="exampleInputPassword1">Password</label>
						<input type="password" ref='password' className="form-control" id="exampleInputPassword1" placeholder='Please enter your password' />
						<div className='error' ref='passwordError'>{this.state.data.password}</div>
					</div>
					<button type="submit" ref='loginBtn' className="btn btn-primary btn-lg btn-block form-btn">Log In</button>
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
		
		this.props.user.login({
			username: this.refs.username.getDOMNode().value,
			password: this.refs.password.getDOMNode().value
		}, {
			success: function(userModel) {
				app.navigate('createPost', {trigger: true});
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
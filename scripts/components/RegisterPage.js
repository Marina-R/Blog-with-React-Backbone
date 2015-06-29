var React = require('react');
var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var UserModel = require('../models/UserModel');
var validator = require('validator');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: {},
			avatarUrl: 'http://androidforums.com/styles/androidforumsv3/xenforo/avatars/avatar_l.png'
		}
	},
	render: function () {
		var avatarSize = {
			height: '60px'
		};
		var genericError = null;
		if(this.state.data.generic) {
			genericError = (<div className='alert alert-danger' role='alert'>{this.state.data.generic}</div>);
		}
		
		if(this.state.avatarUrl) {
			var avatarUrl = (<img src={this.state.avatarUrl} style={avatarSize}/>);
		}
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive",
			fontSize: '45px'
		};
		return (
			<div className='login-form'>
				<h1 style={titleStyle}>Register</h1>
				{genericError}
				<form className='form' ref='registerForm' onSubmit={this.register}>
					<div className='form-group '>
						<label>Username</label>
						<input type="text" ref='username' className="form-control" id="exampleInputEmail1" placeholder="Plese enter your username" />
						<div className='error' ref='usernameError'>{this.state.data.username}</div>
					</div>
					<div className="form-group " >
						<label>Password</label>
						<input type="password" ref='password' className="form-control" id="exampleInputPassword1" placeholder='Please enter your password' />
						<div className='error' ref='passwordError'>{this.state.data.password}</div>
					</div>
					<div className="form-group ">
						<label>Email</label>
						<input type="email" ref='email' className="form-control" id="exampleInputPassword1" placeholder='Please enter your email' />
						<div className='error' ref='emailError'>{this.state.data.email}</div>
					</div>
					<div className="media">
						<div className="media-left">
							<a href="#">
								{avatarUrl}
							</a>
						</div>
						<div className="media-body">
							<button type='button' onClick={this.uploadAvatar} className='btn btn-default'>Choose your avatar</button>
						</div>
					</div>
					<div>
						<button type="submit" className="btn btn-primary btn-lg btn-block form-btn">Sign Up</button>
					</div>
				</form>
			</div>
		)
	},
	uploadAvatar: function() {
		var self = this;
		filepicker.pickAndStore(
			{
				mimtype: 'image/*'
			},
			{},
			function(InkBlobs) {
				self.setState({
					avatarUrl: InkBlobs[0].url
				})
			}
		);
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
		
		var newUser = {
			username: this.refs.username.getDOMNode().value,
			password: this.refs.password.getDOMNode().value,
			email: this.refs.email.getDOMNode().value,
			avatar: this.state.avatarUrl
		};

		var error = {};

		if(!newUser.username) {
			error.username = 'Please enter your username';
		} else if(!newUser.password) {
			error.password = 'Please enter your password';
		} else if(!validator.isLength(newUser.password, 6)) {
			error.password = 'Password should be at least 6 characters length';
		} else if(!newUser.email) {
			error.email = 'Please enter your email';
		} else if(!validator.isEmail(newUser.email)) {
			error.email = 'Email should be valid';
		}

		this.setState({data: error});

		if(!this.hasError(error)) { 
			this.props.user.save(newUser, {
				success: function(userModel) {
					app.navigate('createPost', {trigger: true});
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
var React = require('react');
var parseSettings = require('./config/parse.js');
var Backbone = require('backparse')(parseSettings);

var HomePage = require('./components/HomePage');
var LoginPage = require('./components/LoginPage');
var RegisterPage = require('./components/RegisterPage');
var Profile = require('./components/ProfileComponent');
var container = document.getElementById('container');

var UserModel = require('./models/UserModel');

var App = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'register': 'register',
		'profile': 'profile'
	},
	home: function() {
		React.render(
			<HomePage app={app} />,
			container
		)
	},
	login: function() {
		React.render(
			<LoginPage app={app} />,
			container
		)
	},
	register: function() {
		React.render(
			<RegisterPage app={app} />,
			container
		)	
	},
	profile: function() {
		React.render(
			<Profile app={app} />,
			container
		)	
	}
});
var app = new App();
Backbone.history.start();
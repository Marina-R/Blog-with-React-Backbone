var React = require('react');
var parseSettings = require('./config/parse.js');
var Backbone = require('backparse')(parseSettings);

var HomePage = require('./components/HomePage');
var LoginPage = require('./components/LoginPage');
var RegisterPage = require('./components/RegisterPage');
var CreatePost = require('./components/CreatePost');
var PostListPage = require('./components/PostListPage');
var Navigation = require('./components/NavigationComponent');
var PostComponent = require('./components/PostComponent');

var container = document.getElementById('container');
var navigationBar = document.getElementById('navigation');
filepicker.setKey('AeK0dNOzoQx2TdjfEqKrOz');

var UserModel = require('./models/UserModel');
var PostCollection = require('./collections/PostCollection');
var user = new UserModel();
var posts = new PostCollection();

function fetchPosts(category, query, userId) {
	var q = {};
	if(category) {
		q.category = category;
	}
	if (query) {
		q.title = {$regex: '.*' + query + '.*' };
	}
	if(userId) {
		q.userId = userId;
	}
	posts.fetch({
		query: q,

		success: function() {
			React.render(<HomePage posts={posts} />, container);
		}
	})
};

var App = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'register': 'register',
		'createPost': 'createPost',
		'post/:postId': 'post',
		'category/:category': 'category',
		'search/:query' : 'search',
		'profile/:username': 'profile'
	},
	home: function() {
		fetchPosts();
		React.render(
			<HomePage user={user} app={app} posts={posts}/>,
			container
		)
	},
	login: function() {
		React.render(
			<LoginPage user={user} app={app} />,
			container
		)
	},
	register: function() {
		React.render(
			<RegisterPage user={user} app={app} />,
			container
		)	
	},
	createPost: function() {
		React.render(
			<CreatePost user={user} app={app} />,
			container
		)	
	},
	post: function(postId) {
		React.render(
			<PostComponent user={user} postId={postId} app={app} posts={posts} />,
			container
		)
	},
	category: function(category) {
		fetchPosts(category);
		React.render(
			<HomePage user={user} posts={posts} app={app} />,
			container
		)
	},
	search: function(query) {
		fetchPosts(null, query);
		React.render(
			<HomePage user={user} posts={posts} app={app} />,
			container
		)
	},
	profile: function(username) {
		fetchPosts(null, null, username);
		React.render(
			<HomePage user={user} posts={posts} app={app} />,
			container
		)
	}
});
var app = new App();
Backbone.history.start();

React.render(<Navigation user={user} app={app} />, navigationBar);

user.me();
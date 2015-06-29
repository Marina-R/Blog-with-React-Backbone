var React = require('react');
var UserModel = require('../models/UserModel');
var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = React.createClass({
	componentWillMount: function() {
		this.props.user.on('change', function() {
			this.forceUpdate();
		}, this);
	},
	render: function () {
		var links = [];
		var userDropdown = null;
		var avatarStyle = {
			height: '50px',
			width: '50px',
			backgroundImage: 'url('+this.props.user.attributes.avatar+')',
			backgroundSize: '100%',
			backgroundRepeat: 'no-repeat',
			float: 'right',
			margin: '5px'
		};
		var navStyle = {
			backgroundImage: 'url(https://d1wli5mq9yq9mw.cloudfront.net/static/images/bg_main.gif)',
		};
		var logo = {
			backgroundRepeat: 'no-repeat',
			backgroundSize: '100%',
			width: '150px',
			backgroundImage: 'url(https://www.postable.com/application/skins/default/im/logo_pintrest.png)'
		};
		if(!this.props.user.id) {
			links.push(<li key="register"><a href="#register">Register</a></li>);
			links.push(<li key="login"><a href="#login">Log In</a></li>);
		}
		else {
			links.push(<li key="logout"><a href="#" onClick={this.logOut}>Log out</a></li>);
			links.push(<li key="createPost"><a href="#createPost">Add post</a></li>);
			userDropdown = (
				<div>
				<div className="media media-left" style={avatarStyle}></div>
				<ul className="nav navbar-nav navbar-right">
					<li onClick={this.toProfile} >
						<a style={{cursor: 'pointer'}}>{this.props.user.get('username')}</a>
					</li>
				</ul>
				</div>
			);
		}
		return(
			<nav className="navbar navbar-default" style={navStyle}>
	  			<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand " href="#" style={logo}></a>
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							{links}
						</ul>
						<form className="navbar-form navbar-left" role="search" onSubmit={this.onSearch}>
							<div className="form-group">
								<input ref='search' type="text" className="form-control" placeholder="Search" />
							</div>
							<button type="submit" className="btn btn-default" >Submit</button>
						</form>
						{userDropdown}
					</div>
	  			</div>
			</nav>
		)
	},
	logOut: function() {
		this.props.user.logout();
	},
	onSearch: function(e) {
		e.preventDefault();
		var app = this.props.app;
		app.navigate('search/'+this.refs.search.getDOMNode().value, {trigger: true});
	},
	toProfile: function() {
		console.log(this.props.posts)
		this.props.app.navigate('profile/'+this.props.user.get('username'), {trigger: true});
	}	
});
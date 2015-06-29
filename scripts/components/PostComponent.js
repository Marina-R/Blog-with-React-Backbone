var React = require('react');
var PostModel = require('../models/PostModel');
var moment = require('moment');

module.exports = React.createClass({
	getInitialState: function() {
		var self = this;
		var post = new PostModel({
			objectId: this.props.postId
		});
		post.fetch();
		post.on('change', function() {
			self.forceUpdate();
		});
		return {
			post: post
		};
	},
	render: function() {
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive"
		};
		var bodyStyle = {
			fontFamily: "'Droid Sans', sans-serif",
			padding: '2em',
			backgroundColor: '#fbfaf8',
			marginLeft: '2em',
			color: 'black'
		};
		var blogStyle = {
			backgroundImage: 'url(https://d1wli5mq9yq9mw.cloudfront.net/static/images/bg_main.gif)',
			paddingBottom: '2em',
			boxShadow: '0 1px 3px rgba(0,0,0,.2)'
		};
		var imageStyle = {
			marginLeft: '1em'
		};
		return (
			<div className='row'>
				<div style={blogStyle} className='col-sm-8 col-sm-offset-2'>
					<div className='row col-sm-12'>
						<h1 style={titleStyle}>{this.state.post.get('title')}</h1>
					</div>
					<div className='row col-sm-12'>
						<p className='row col-sm-4 col-sm-offset-1'>{this.state.post.get('userId')}</p>
						<p className='row col-sm-4 col-sm-offset-3' style={{textAlign:'right'}}>{moment(this.state.post.get('createdAt')).fromNow()}</p>
					</div>
					<div className='row col-sm-12'>
						<div style={bodyStyle}>{this.state.post.get('body')}</div>
						<img className='row col-sm-12' src={this.state.post.get('image')} style={imageStyle} />
					</div>
					<div className='row col-sm-11 col-sm-offset-1'><a style={{cursor: 'pointer'}} onClick={this.allFromCategory}>{this.state.post.get('category')}</a></div>
				</div>
			</div>
		);
	},
	allFromCategory: function() {
		this.props.app.navigate('category/'+this.state.post.get('category'), {trigger: true});
	}
});
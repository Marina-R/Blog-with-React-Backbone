var React = require('react');
var PostCollection = require('../collections/PostCollection');
var moment = require('moment');

module.exports = React.createClass({
	render: function () {
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
		var blogStyle={
			backgroundImage: 'url(https://d1wli5mq9yq9mw.cloudfront.net/static/images/bg_main.gif)',
			paddingBottom: '2em'
		};
		var postStyle = {
			margin: '1em'
		};
		
		var postsEl = this.props.posts.map(function(postModel) {
			return(
				<div className='row' style={postStyle} key={postModel.cid}>
					<div style={blogStyle} className='col-sm-6 col-sm-offset-3'>
						<div className='row col-sm-12'>
							<h1 style={titleStyle}>{postModel.get('title')}</h1>
						</div>
						<div className='row col-sm-12'>
							<p className='row col-sm-4 col-sm-offset-1'>{postModel.get('userId')}</p>
							<p className='row col-sm-4 col-sm-offset-3'>{moment(postModel.get('createdAt')).fromNow()}</p>
						</div>
						<div className='row col-sm-12'>
							<p style={bodyStyle}>{postModel.get('body')}</p>
						</div>
						<div className='row col-sm-11 col-sm-offset-1'><a href={'#category/'+ postModel.get('category')}>{postModel.get('category')}</a></div>
					</div>
				</div>
			);
		})
		return (
			<div>
				{postsEl}
			</div>
		)
	}
});

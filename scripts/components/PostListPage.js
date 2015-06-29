var React = require('react');
var PostCollection = require('../collections/PostCollection');

module.exports = React.createClass({
	getInitialState: function () {
	 	var posts = new PostCollection();
	 	var self = this;
	 	var q = {};

	 	if(this.props.category) {
	 		q.category = this.props.category;
	 	}

	 	posts.fetch(
	 		{
	 			query: q,
		 		{
		 			title: {
		 				$regex: '.*first.*' //looking for the word first 
		 			}
		 			categoty: 'js',
		 			createdAt: {
		 				$lt: {
		 					'__type': 'Date',
		 					'iso':'time from server'
		 				}
		 			}
	 		},
	 		success: function() {
	 			self.forceUpdate();
	 			posts.on('add', function() {
	 				self.forceUpdate();
	 			});
	 		}
	 	});

	 	return {
	 		posts: posts
	 	}
	},
	render: function() {
		var postEls = this.state.posts.map(function(postModel) {
			return(
				<div key={postModel.cid}>
					<h3>{postModel.get('title')}</h3>
					<p>{postModel.get('body')}</p>
					<p>{postModel.get('categoty')}</p>
				</div
			)
		})
	 	return(
	 		<div className = 'row'>
	 			<div className='col-sm-6 col-sm-offset-3'>
	 				{postEls}
	 			</div>
	 		</div>
	 	);
	}
});

var React = require('react');
var UserCollection = require('../collections/UserCollection');
var PostModel = require('../models/PostModel');

module.exports = React.createClass({
	componentWillMount: function() {
		var users = new UserCollection();
		users.fetch();
	},
	getInitialState: function() {
		return {
			data: {}
		};
	},
	render: function () {
		var genericError = null;

		var imageSize = {
			height: '60px'
		};
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive",
			fontSize: '40px'
		};
		if(this.state.data.generic) {
			genericError = (<div className="alert alert-danger" role="alert">{this.state.data.generic}</div>);
		}
		if(this.state.data.image) {
			var image = (<img src={this.state.data.image} style={imageSize}/>);
		}
		return (
			<div>
				<div className='row col-sm-8 col-sm-offset-2'>
					<h3 style={titleStyle}>Express yourself in your blog post!</h3>
					{genericError}
					<form  className='form' ref='postForm' onSubmit={this.onPost}>
						<div className='form-group'>
							<label for="exampleInputEmail1">Title</label>
							<input type="text" ref='title' className="form-control" id="exampleInputEmail1" placeholder="Title" />
							<div className='error' ref='titleError'>{this.state.data.title}</div>
						</div>
						<div className="form-group">
							<label for="exampleInputPassword1">Blog body</label>
							<textarea ref='body' className="form-control" rows="4" placeholder='Text goes here...'></textarea>
							<div className='error' ref='bodyError'>{this.state.data.body}</div>
						</div>
						<select className="form-control" ref='category'>
							<option value='' selected>--Choose category--</option>
						 	<option value='JavaScript'>JS</option>
						 	<option value='jQuery'>jQuery</option>
						 	<option value='CSS'>CSS</option>
						 	<option value='HTML5'>HTML5</option>
						</select>
						<div className="media">		
							<div className="media-left">
								<a href="#">
									{image}
								</a>
							</div>
							<div className="media-body">
								<button type='button' onClick={this.addImage} className='btn btn-default'>Add image</button>
							</div>
						</div>
						<button type="submit" ref='postBtn' className="btn btn-primary btn-lg btn-block form-btn">Submit</button>
					</form>
				</div>
			</div>
		)
	},
	onPost: function(e) {
		e.preventDefault();
		var app = this.props.app;
		var self = this;

		var post = new PostModel({
			title: this.refs.title.getDOMNode().value,
			body: this.refs.body.getDOMNode().value,
			userId: self.props.user.attributes.username,
			userAvatar: self.props.user.attributes.avatar,
			category: this.refs.category.getDOMNode().value,
			image: this.state.data.image
		}); 

		if(post.isValid()) {
			post.save(null, {
				success: function() {
					app.navigate('post/'+post.id, {trigger:true})
				}
			});	
		} else {
			this.setState({data: {generic: post.validationError}});
		}
	},
	addImage: function() {
		var self = this;
		filepicker.pickAndStore(
			{
				mimtype: 'image/*'
			},
			{},
			function(InkBlobs) {
				self.setState({
					data: {image: InkBlobs[0].url}
				})
			}
		);
	}
});
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title:{
		type: String
	},
	desc:{
		type: String
	},
	content:{
		type: String
	},
	user_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt:{
		type: Date,
		default: new Date()
	},
	image:{
		type: String
	}
});

const Post = mongoose.model('Post',postSchema);	//represents a collections and its obj repesents a document

module.exports = Post;
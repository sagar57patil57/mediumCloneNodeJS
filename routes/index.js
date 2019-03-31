var express = require('express');
var router = express.Router();
const Post = require('../db/models/post');


router.get('/',async (req, res)=>{

	const posts= await Post.find({}).populate('user_id');
	console.log(posts);
	res.render('index',{
			posts: posts
	});
});




module.exports = router;
var express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
var router = express.Router();
const Post = require('../db/models/post');
const authcheck = require('../middleware/authcheck');

router.get('/create',authcheck,(req, res)=>{
	res.render('newpost');
});

router.post('/create',(req, res)=>{
	const { image } = req.files;	//just like req.body but for files
	image.mv(path.resolve(__dirname,'..' ,'public/postimages', image.name), (err)=>{

		console.log(err);

		Post.create({
			...req.body,
			image: '/postimages/' + image.name,
			user_id: req.session.userId
		},(err,post)=>{
		res.redirect('/');
	});

	});	//move this file to other location
});

router.get('/',(req, res)=>{
	res.render('post');
});

router.get('/:id',async (req, res)=>{
	
	const post= await Post.findById(req.params.id);
		res.render('post',{
			post: post
	});
});


router.post('/list',async (req, res)=>{

	const query = req.body.search;
	const query_str = "/" + query + "i";
	//console.log(query_str);
	const posts= await Post.find({'title': {'$regex': query,$options:'i'}}).populate('user_id');
	//console.log(posts);
	res.render('postlist',{
			posts: posts
	});
});


module.exports = router;
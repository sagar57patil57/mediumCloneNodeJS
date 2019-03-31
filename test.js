const mongoose = require('mongoose');
const Post = require('./db/models/post');

mongoose.connect('mongodb://localhost/test-blogapp');

/*Post.create({
	title: 'second test',
	desc: 'dskcjds',
	content: 'asasckcjkewcjewlckwnvkn lkflk n flwnknknknkd'
},(err,post)=>{
	console.log(err, post);
});*/

Post.find({}, (err,posts)=>{
	console.log(err, posts);
})

Post.findById("5c9f4fcd5dcf164a497955ca",(err,posts)=>{
	console.log(err, posts);
});

Post.findByIdAndUpdate("5c9f4fcd5dcf164a497955ca",{ title:'sagar' },(err,posts)=>{
	console.log(err, posts);
});
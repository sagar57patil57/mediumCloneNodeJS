const express = require('express');
const path = require('path');
const app = new express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

const indexrouter = require('./routes/index');
const postrouter = require('./routes/post');
const aboutrouter = require('./routes/about');
const contactrouter = require('./routes/contact');
const userrouter = require('./routes/user');

//databases
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogapp');
const Post = require('./db/models/post');
mongoose.set('useCreateIndex', true)

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
	secret: 'secret key',
	store: new mongoStore({
		mongooseConnection: mongoose.connection
	}),
	cookie: { secure: false }
}));

app.use(function(req, res, next){		//to make session data availabe in templates
        res.locals.session = req.session;
        next();
});

app.use(fileUpload());

app.set('view engine', 'hbs');//view engine

//statc assests
const publicDirPath = path.join(__dirname, '/public');
const partialsPath = path.join(__dirname, '/views/partials');
//app.set('views', path.join(__dirname, '../views'));

app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routing

app.use('/',indexrouter);
app.use('/post',postrouter);
app.use('/about',aboutrouter);
app.use('/contact',contactrouter);
app.use('/user',userrouter);
app.get('*',(req, res)=>{
	res.send('404 Page');
});


app.listen(3000,()=>{
	console.log('connected');
});
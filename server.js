// set up ========================
const express  = require('express');
const app      = express();                         // create our app w/ express
const mongoose = require('mongoose');               // mongoose for mongodb
const morgan = require('morgan');             		// log requests to the console (express4)
const bodyParser = require('body-parser');    		// pull information from HTML POST (express4)
const methodOverride = require('method-override'); 	// simulate DELETE and PUT (express4)
const passport = require('passport');				// passport for logging in.
const LocalStrategy = require('passport-local');	// local login strategy.
const bcrypt = require('bcrypt-nodejs');			// for encrypting and decrypting strings (e.g. passwords).
const session = require('client-sessions');			// for session management.

const multer = require('multer');					// for uploading images and other files.
const fs = require('fs');							// for file system manipulation.


// configuration =================

// connect to mongoDB database on localhost.
mongoose.connect('mongodb://localhost:27017/braunian-noise', function(err) { 
	if(err != undefined) {
		console.log('MongoDB: ' + err.message);
	}
});     

// Express configuration.
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console

app.use(bodyParser.urlencoded({extended:'true', limit: '50mb'}));            	// parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(methodOverride());

// Configure session functionality.
app.use(session({
  cookieName: 'bn-session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,				// How long the user can stay inactive before the session expires (in milliseconds).
  activeDuration: 5 * 60 * 1000,		// How long the session duration is updated when the user interacts with the site.
}));

// Configure Multer disk storage procedures,
// e.g. folder destination and file names.

// Folder in which the images from the blog posts should be stored.
const IMAGE_BLOG_STORAGE_FOLDER = 'images/content/';
const IMAGE_BLOG_STORAGE_FOLDER_FULL = 'public/' + IMAGE_BLOG_STORAGE_FOLDER;

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, IMAGE_BLOG_STORAGE_FOLDER_FULL);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

var image_upload = multer({storage: storage});

// define model =================

// Blog post.
var Blogpost = mongoose.model('Post', {
	title: String,
	header_img: String,
	categories: Array,
	author:	String,
	created_on: Number,
	edited_on: Number,
	likes: Number,
	content: Object
});

// User.
var User = mongoose.model('User', {
	username: String,
	screenname: String,
	password: String
});


// configure local login with passport. ==========

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		// Try to find the user with the given username in the DB.
		User.findOne({ username: username }, 
		
			function (err, user) {				
				if (err) {
					// Error logging in.
					return done(err);
				}
				if (!user) {
					// Incorrect username.
					return done(null, false);
				}
				// Check password.
				bcrypt.compare(password, user.password, function(err, res) {
					
					if(res == true) {
						return done(null, user);
					}			
					else {
						return done(null, false);
					}	
										
				})				
		});
	}
));

// routes ======================================================================

// api ---------------------------------------------------------------------

// login route
app.post('/api/login',	
	// authenticare using passport.
	passport.authenticate('local'),	
	function(req, res) {		
		console.log(req.user);
		if(req.user) {
			req.session.user = req.user;
			res.json(req.user);
		}
		else {
			res.status(401).send('Invalid username or password.');
		}
	}
);

// logout route
app.post('/api/logout', function(req, res) {
	req.logout();
	res.status();
});

// route middleware function that checks whether the user has logged in.
var is_logged_in = function(req, res, next) {	
	if(req.isAuthenticated()) {
		return next();
	}
	else {
		req.status(401).send('You need to be logged in.');
	}
}

// create a post
app.post('/api/upload-post', is_logged_in, function(req, res) {
	console.log(req.body);
	
	var post = req.body;
	
	// create a blog post.
	Blogpost.create({
		title: 		post.title,
		header_img: post.header_img,
		categories:	post.categories,
		author:		post.author,
		created_on:	post.created_on,
		edited_on:	post.edited_on,
		likes:		post.likes,
		content:	post.content
	}, function(err, new_post) {
		if (err) {
			res.send(err);
		}			
		res.status(201).send(new_post);
	});
	
});

// Route for uploading an image.
app.post('/api/upload-image', is_logged_in, image_upload.single('image'), function(req, res) {
	
	// Remove the 'public/' at the start of the file path.
	var file_path = req.file.path.replace(/^(public\\)/,"");
	
	// Send back an 201 code, indicating that the image
	// has been succesfuly created.
	// Response includes the file path.
	res.status(201).send(file_path);
});

// Route for deleting an image.
app.delete('/api/delete-image', is_logged_in, function(req, res) {
	
	// Send an error response when no
	// path is set in the body.
	if(req.body.imgpath = undefined) {
		res.status(400).send('Missing path to the image in the request.');
	}
	
	// Get the file path from the request.
	var image_path = IMAGE_BLOG_STORAGE_FOLDER + req.body.imgpath;
	var full_image_path = 'public/' + image_path;
	
	// Delete the image from the server.
	fs.unlink(full_image_path , function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log('[info] Deleted image "' + image_path + '"');
			res.status(200).send('Image deleted.');
		}
		
	});
	
});



// application -------------------------------------------------------------
app.get('*', function(req, res) {
	// load the main page!
	res.sendFile(__dirname + '/public/index.html'); 
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
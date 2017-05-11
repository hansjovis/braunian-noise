// set up ========================
var express  = require('express');
var app      = express();                            // create our app w/ express
var mongoose = require('mongoose');                 // mongoose for mongodb
var morgan = require('morgan');             		// log requests to the console (express4)
var bodyParser = require('body-parser');    		// pull information from HTML POST (express4)
var methodOverride = require('method-override'); 	// simulate DELETE and PUT (express4)
var passport = require('passport');					// passport for logging in.
var LocalStrategy = require('passport-local');		// local login strategy.
var bcrypt = require('bcrypt-nodejs');				// for encrypting and decrypting strings (e.g. passwords).
var session = require('client-sessions');			// for session management.


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
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Configure session functionality.
app.use(session({
  cookieName: 'bn-session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,				// How long the user can stay inactive before the session expires (in milliseconds).
  activeDuration: 5 * 60 * 1000,		// How long the session duration is updated when the user interacts with the site.
}));

// define model =================

// Blog post.
var Blogpost = mongoose.model('Post', {
	title: String,
	header_img: String,
	categories: Array,
	author:	String,
	created_on: String,
	likes: Number,
	contents: String
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

// create a post
app.post('/api/upload-post', function(req, res) {
	console.log(req.body);
	/*
	// create a blog post.
	Blogpost.create({
		text : req.body.text,
		done : false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
	*/
});



// application -------------------------------------------------------------
app.get('*', function(req, res) {
	// load the main page!
	res.sendFile(__dirname + '/public/index.html'); 
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
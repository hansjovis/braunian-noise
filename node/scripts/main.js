
// === Imports. ===

var http = require('http');

var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             			// log requests to the console (express4)
var bodyParser = require('body-parser');    			// pull information from HTML POST (express4)
var methodOverride = require('method-override'); 		// simulate DELETE and PUT (express4)

var mongoose = require('mongoose');

// === Express configuration. ===

app.use(express.static(__dirname + '/public'));                 // set the static files location, e.g. /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css"
};

// Connect to the MongoDB through Mongoose.
mongoose.connect('mongodb://localhost/test');
console.log('[INFO] [Braunian Noise - Server main] Connected to MongoDB through Mongoose.')

// === Mongoose schema's and models. ===

// Simple schema for a blog post.
var post_schema = mongoose.Schema({
	title: String,
	categories: [],
	created_on: { type: Date, default: Date.now },
	likes: Number,
	author: String,
	header_img: String,
	contents: String	
});

// Make a model out of the blog post schema.
var Post = mongoose.model('Post', post_schema);


// === Routing with Express ===

// Get the router from express.
var router = express.Router();

// Allow 
router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Route for posting a new blog post.
router.post('/put-post' , function(req, res) {
	
	console.log("hello!");
	
	// Get the new post's information from the request.
	var post = req.body;
	
	Post.create({
		title: post.title,
		contents: post.contents,
		author: post.author,
		categories: post.categories,
		header_img: post.header_img,
		created_on: post.created_on,
		likes: 0,		
	},
		function (err, small) {
			if (err) {
				console.log("error creating post!");
			}
		}
	)
	res.send("Blog post posted!");
});

app.use('/', router);

// === Listen (start app with node server.js) ===
app.listen(8080, function() {
	console.log("App listening on port 8080");
});


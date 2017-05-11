/**
 *	Controller Template.
 *	 
 *	[Controller description]
 */
var NewPostController = function($scope, $sanitize, loginService) {
	
	// Mockup of the categories, will be replaced with a call to the backend.
	$scope.categories = [
		{
			name: 'Music',
			icon: 'fa-music',
			num_posts: 3,
			description: 'All posts about music!'
		},
		{
			name: '3D',
			icon: 'fa-cube',
			num_posts: 4,
			description: 'All 3D things.'
		},
		{
			name: '2D',
			icon: 'fa-picture-o',
			num_posts: 2,
			description: 'All 2D things.'
		},
		{
			name: 'Programming',
			icon: 'fa-terminal',
			num_posts: 5,
			description: 'Programming stuff'
		},
		{
			name: 'Games',
			icon: 'fa-gamepad',
			num_posts: 2,
			description: 'Game stuff'
		},
		{
			name: 'Books',
			icon: 'fa-book',
			num_posts: 5,
			description: 'Book stuff'
		}				
	];
	
	$scope.default_header_img_url = "images/Sample/placeholder-image600x300.jpg";
		
	// Model of the current post.
	$scope.post = {
		id: 0,		
		title: "",			
		header_img: {},
		categories: [],
		author:	"",
		created_on: "",
		likes: 0,
		content_raw: "",
		content: []
	};
	
	// Set the default post values:
	$scope.post.author = loginService.loggedInUser();
	$scope.post.created_on = Date.now();
	
	$scope.images = [];	
	$scope.selected_categories = [];
	
	$scope.upload_img = function(image_id) {
		
		var file = document.getElementById('post_img_input_' + image_id).files[0];
				
		var image_url = window.URL.createObjectURL(file);		
		
		$scope.images[image_id] = image_url;		
						
		document.getElementById('post_img_' + image_id).src = image_url;
					
		console.log(file);
	}	
		
	$scope.generate_html = function() {
							
		var html = $scope.post.content_raw;		
		
		// Replace the neccesary markdown tags
		// with html-ones.
		html = replace_italics(html);
		html = replace_bold(html);
		html = replace_headers(html);		
		html = replace_lists(html);		
		html = replace_linebreaks(html);		

		var content = replace_objects(html);
		
		$scope.post.content = content;
	}
	
	/**
	 *	Replaces all line breaks (e.g. "\n") with '<br>'-tags.
	 *	@param {String} string - the string in which the line breaks should be replaced.
	 *	@returns {String} the string with all the line breaks replaced by '<br>'
	 */
	var replace_linebreaks = function(string) {
		var re_newline = /\n/gi;
		
		return string.replace(re_newline, "<br>");
	}
	
	/**
	 *	Transforms a string of text into an array of text and media-objects.
	 *	Each object has a type, indicating the type of object ('image' or 'text')
	 *	and an id.
	 *
	 *	'[img]' tags are replaced by image-objects, consisting of the image source.
	 *	All text between two tags are consolidated into one text object, consisting of the text.
	 */
	var replace_objects = function(string) {
		
		var re_image = /(\[img\])/gi;
						
		// Split on [img] tag.
		var split = string.split(re_image);
						
		var content = [];
		
		var image_id = 0;
		
		// Generate the content as an array of 
		// objects: 'text' for normal text,
		//			'image' for images.		
		for(var i=0; i<split.length; i++) {
			
			if(split[i].match(re_image)) {
				content.push(
					{
						id: image_id,
						type: "image",
						source: $scope.images[image_id],
						caption: ""
					}
				);					
				image_id++;
			}
			else {
				content.push(
					{
						id: i,
						type: "text",
						text: split[i]
					}
				)
			}					
		}
		
		console.log(content);
		
		return content;
		
	}
	
	/**
	 *	Replaces markdown lists and list-items with 
	 *	their respective html counterparts (ordered and unordered).
	 *
	 *	E.g. 	* item 1
	 *			* item 2
	 *	becomes
	 *			<ul>
	 *				<li> item 1
	 *				<li> item 2
	 *			</ul>
	 *		@param {string} string the string that needs to be transformed.
	 *		@param {string} the transformed string
	 */
	var replace_lists = function(string) {
		
		// Regular expressions for markdown ordered and unordered lists.
		var re_ul = /(\* .*\n?)+/gi;
		var re_ol = /(\d\. .*\n?)+/gi;
		
		// Regular expressions for list items.
		var re_uli = /\* (.*\n?)/gi;
		var re_oli = /\d\. (.*\n?)/gi;
		
		// Replace markdown ordered and unordered lists
		// with their respective html counterpart.
		string = string.replace(re_ul, "<ul>$&</ul>");
		string = string.replace(re_ol, "<ol>$&</ol>");
		
		// Replace markdown ordered and unordered list-items
		// with their respective html counterpart.
		string = string.replace(re_uli, "<li>$1</li>");
		string = string.replace(re_oli, "<li>$1</li>");
		
		return string;
	}
	
	/**
	 *	Replaces markdown headers with html-headers.
	 *	E.g.	"#Header" -> "<h1>Header</h1>"
	 *			"##Header" -> "<h2>Header</h2>"
	 */
	var replace_headers = function(string) {
		
		// Regular expression for markdown headers.
		var re_header_1 = /(#)(.*)\n?/gi;
		var re_header_2 = /(##)(.*)\n?/gi;
		var re_header_3 = /(###)(.*)\n?/gi;
		var re_header_4 = /(####)(.*)\n?/gi;
		
		// Replace the markdown headers 
		// with their respective html counterpart.
		string = string.replace(re_header_4, "<h4>$2</h4>");
		string = string.replace(re_header_3, "<h3>$2</h3>");
		string = string.replace(re_header_2, "<h2>$2</h2>");
		string = string.replace(re_header_1, "<h1>$2</h1>");
		
		return string;
	}
	
	/**
	 *	Replaces markdown bold text with html-bold tags + text
	 *	by replacing '*Bold*' text with '<b>Bold</b>'.
	 */
	var replace_bold = function(string) {
		
		// Regular expression for markdown bold.
		var re_bold = /\*(\w+)\*/g;
		
		// Replace the markdown bold with the appropriate <b>-tags.
		return string.replace(re_bold, "<b>$1</b>");
	}
	
	/**
	 *	Replaces markdown italics text with html-italics tags + text.
	 *	by replacing '_Italics_' text with '<i>Bold</i>'.
	 */
	var replace_italics = function(string) {
		
		// Regular expression for markdown bold.
		var re_italics = /_(\w+)_/g;
		
		// Replace the markdown bold with the appropriate <b>-tags.
		return string.replace(re_italics, "<i>$1</i>");
	}
	
};

// Register the controller.
angular.module('braunianApp').controller('NewPostController', NewPostController);

// Inject the relevant factories and services.
NewPostController.$inject = ['$scope', '$sanitize', 'loginService'];
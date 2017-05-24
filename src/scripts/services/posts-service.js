
/**
 *	Service for getting blog posts from the database.
 *	NOTE: This is currently a spoof: connection to the database
 *	has not been implemented yet!
 */
var PostsService = function($resource, baseURL) {
	var posts = [
		{
			id: 0,
			title: "Post Books #1",
			category: "Books",
			header_img: "images/Sample/placeholder-image600x300.jpg",
			author:	"Hans-Christiaan Braun",
			date: "22-8-2016",
			likes: 4,
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
							Cras tincidunt, mi eu imperdiet ornare, ex ex dignissim est, \
							non porttitor libero sapien dapibus orci. Nam quis massa lobortis, \
							<b> facilisis dui et</b>, euismod ipsum. Praesent eget erat egestas, \
							vulputate orci ac, porta ex. Proin vehicula, lectus pharetra \
							dapibus volutpat, dui felis rutrum dolor, nec mattis libero justo \
							non diam. Nam non finibus felis, ut imperdiet nibh. Maecenas vitae \
							orci justo. Nullam iaculis sem metus, tempor interdum dui ultricies \
							pretium. Phasellus consectetur fermentum tortor, eu gravida erat \
							vulputate at. Vestibulum non sapien malesuada mi bibendum volutpat \
							sed vitae lectus. Nullam eu vestibulum enim. Etiam maximus tempus congue. \
							Suspendisse varius cursus sagittis. Proin eget dui volutpat, \
							interdum velit nec, cursus quam. Cras sit amet nulla libero."
		},
		{
			id: 1,
			title: "Post 3D #1",
			category: "3D",
			header_img: "images/Sample/placeholder-image600x300.jpg",
			author:	"Hans-Christiaan Braun",
			date: "22-8-2016",
			likes: 0,
			content: "<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
							Cras tincidunt, mi eu imperdiet ornare, ex ex dignissim est, \
							non porttitor libero sapien dapibus orci.</p> \
							<p> Nam quis massa lobortis, \
							facilisis dui et, euismod ipsum. Praesent eget erat egestas, \
							vulputate orci ac, porta ex. Proin vehicula, lectus pharetra \
							dapibus volutpat, dui felis rutrum dolor, nec mattis libero justo \
							non diam. Nam non finibus felis, ut imperdiet nibh. Maecenas vitae \
							orci justo. Nullam iaculis sem metus, tempor interdum dui ultricies \
							pretium.</p>Phasellus consectetur fermentum tortor, eu gravida erat \
							vulputate at. Vestibulum non sapien malesuada mi bibendum volutpat \
							sed vitae lectus. Nullam eu vestibulum enim. Etiam maximus tempus congue. \
							Suspendisse varius cursus sagittis. Proin eget dui volutpat, \
							interdum velit nec, cursus quam. Cras sit amet nulla libero."
		},
		{
			id: 2,
			title: "Post 3D #2",
			category: "3D",
			header_img: "images/Sample/placeholder-image600x300.jpg",
			author:	"Hans-Christiaan Braun",
			date: "22-8-2016",
			likes: 10,
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
							Cras tincidunt, mi eu imperdiet ornare, ex ex dignissim est, \
							non porttitor libero sapien dapibus orci. Nam quis massa lobortis, \
							facilisis dui et, euismod ipsum. Praesent eget erat egestas, \
							vulputate orci ac, porta ex. Proin vehicula, lectus pharetra \
							dapibus volutpat, dui felis rutrum dolor, nec mattis libero justo \
							non diam. Nam non finibus felis, ut imperdiet nibh. Maecenas vitae \
							orci justo. Nullam iaculis sem metus, tempor interdum dui ultricies \
							pretium. Phasellus consectetur fermentum tortor, eu gravida erat \
							vulputate at. Vestibulum non sapien malesuada mi bibendum volutpat \
							sed vitae lectus. Nullam eu vestibulum enim. Etiam maximus tempus congue. \
							Suspendisse varius cursus sagittis. Proin eget dui volutpat, \
							interdum velit nec, cursus quam. Cras sit amet nulla libero."
		}				
	];

	/**
	 *	Gets all the posts belonging to the given category.
	 *	When the given category is 'all_posts', each post is returned.
	 */
	this.getPosts = function(category) {
		// Will contain all the posts from the category.
		var posts_current_cat = [];

		for(var i = 0; i < posts.length; i++) {
			if(posts[i].category === category || category === "all_posts"){
				var post = posts[i];
				post.content_preview = post.content.slice(0,250) + "...";
				posts_current_cat.push(post);
			}						
		}		
		
		return posts_current_cat;
	}

	/**
	 *	Gets the post with the given ID.
	 */
	this.getPost = function(id) {
		
		for(var i = 0; i < posts.length; i++) {					
			if(posts[i].id == id){
				return posts[i];
			}						
		}
	}

	
}

// Register the service.
angular.module('braunianApp').service('postsService', PostsService).constant('baseURL','http://localhost:3000/');

// Inject the relevant factories and services.
PostsService.$inject = ['$resource', 'baseURL'];
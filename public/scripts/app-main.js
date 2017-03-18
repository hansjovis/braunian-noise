'use strict';

/* Angular additions used:
		- ui.router: Router supporting multiple (nested) views within one page.
		- ngResource: Simplifies interaction with resources stored on a RESTful server.
		- ngSanitize: Sanitizes html content so it will not break / contain malificent code.
		- ngCookies: Used to store and retrieve cookies (only used for the like-button for now, so people can only like a post once).
*/
angular.module('braunianApp', ['ui.router','ngResource','ngSanitize','ngCookies'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
					'navigation@': {
						templateUrl : 'views/navigation.html',
						controller  : 'NavigationController'
					},
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
			 
			// route for showing the posts form one category (or all posts)
			.state('app.posts_category', {
                url:'posts/:cat',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
					'navigation': {
						templateUrl : 'views/navigation.html',
						controller  : 'NavigationController'
					},
                    'content@': {
                        templateUrl : 'views/posts.html',
                        controller  : 'PostListController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
			
			// route for showing a specific post.
			.state('app.post', {
                url:'post/:id',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
					'navigation': {
						templateUrl : 'views/navigation.html',
						controller  : 'NavigationController'
					},
                    'content@': {
                        templateUrl : 'views/post.html',
						controller  : 'PostController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
			
			// route for showing the about page.
			.state('app.about', {
                url:'about',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
					'navigation@': {
						templateUrl : 'views/navigation.html',
						controller  : 'NavigationController'
					},
                    'content@': {
                        templateUrl : 'views/about.html'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
			
			// route for showing the login form.
			.state('app.login', {
				url:'login?error',				
				views: {
					'header': {
                        templateUrl : 'views/header.html'
                    },
					'navigation': {
						templateUrl : 'views/navigation.html',
						controller  : 'NavigationController'
					},
                    'content@': {
                        templateUrl : 'views/login.html',
						controller  : 'LoginController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
				}
				
			})
			
			.state('app.new-post-new', {
				url: 'new-post-new',
				views: {
					'header': {
                        templateUrl : 'views/header.html'
                    },
					'whole-page@': {
						templateUrl : 'views/newpost-new.html'
					},
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
				}				
			})
			
			// route for showing the admin dashboard.
			.state('app.admin-dashboard', {
				url: 'admin-dashboard',
				views: {
					'header': {
                        templateUrl : 'views/header.html'
                    },
					'whole-page@': {
						templateUrl : 'views/admin-dashboard.html'
					},
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
				}
			})
			
			// route for showing the post editor.
			.state('app.new_post', {
                url:'new-post',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
					'navigation': {
						templateUrl : 'views/navigation.html',
						controller  : 'NavigationController'
					},
                    'content@': {
                        templateUrl : 'views/newpost.html',
						controller 	: 'NewPostController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
			
			
    
        $urlRouterProvider.otherwise('/');
    })
;

'use strict';

angular.module('braunianApp')
		
		// IndexController
		.controller('IndexController', ['$scope', 
			function($scope) { 
			
		
			}
		])
				
		// Post controller
		.controller('PostController', ['$scope', 'postFactory', '$stateParams', '$cookies',
			function($scope, postFactory, $stateParams, $cookies) {
				
				$scope.post = postFactory.getPost($stateParams.id);
				
			}
		])
		
		// Login controller
		.controller('LoginController', ['$scope', '$stateParams', '$state', 'loginService', function($scope, $stateParams, $state, $loginService) {
			
			$scope.credentials = {
				username: "",
				password: ""
			}
			
			$scope.error = $stateParams.error;
			
			$scope.login = function() {
					console.log('Logging in!');
					console.log($scope.credentials);
					
					$loginService.login($scope.credentials,
						
						function(username) {
							$state.go('app.posts_category', 'all_posts');
						},
						
						function(response) {
							$state.go('app.login',{ error : "Wrong user name or password." });
						}
					
					);					
				}
			}	
		])
		
		// New post controller
		.controller('NewPostController', ['$scope', '$stateParams', '$http',
			function($scope, $stateParams, $http) {
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
				
				$scope.post = {
						id: 0,
						title: "",
						header_img: "images/Sample/placeholder-image600x300.jpg",
						categories: [],
						author:	"",
						created_on: "",
						likes: 0,
						contents: ""
					}
				
				$scope.preview = false;
				
				$scope.upload_header_img = function() {
					var f = document.getElementById('post_img_input').files[0];
										
					var r = new FileReader();
					r.onloadend = function(e) {
						console.log("uploaded header image!");
					}
					
					r.readAsBinaryString(f);
				}
				
				$scope.upload_post = function() {
					console.log('uploading post!');
					$http.post('http://localhost:8080/api/upload-post', $scope.post).then(
						function(response) {
							console.log("Blog post succesfully uploaded!");
							console.log(response);
						}, 
						function(response) {
							console.log("ERROR posting post");
							console.log(response);							
						});
				}
				
				
			}		
		])
;

/**
 *	Post List Controller
 *
 *	Controls the logic of the list of blog posts.
 *	E.g. filtering out the posts not belonging to the current category.
 *	 
 */
var PostListController = function($scope, postFactory, $stateParams, $cookies, loginService) {
	
	// Get the current category from the URL.
	$scope.current_cat = $stateParams.cat;
	
	// Get all the posts for this category.
	$scope.posts = postFactory.getPosts($scope.current_cat);
	
	// Get the logged in user, if there is one 
	// (used to show and hide controls for adminstrating posts and categories).
	$scope.user = loginService.loggedInUser();
	
	/**
	 *	Log the current user out.
	 */
	$scope.logout = function() {
		// Log out.
		loginService.logout(
			// Reload the current page after logging out.
			function() {
				window.location.reload();
			}
		)
	}
	
	/**
	 *	Like the post with the given index, if it has not been liked before
	 *	on the same computer.
	 */
	$scope.like = function(post_index) {
		// If we haven't set the like-cookie of this post..
		if($cookies.get('bn-like-post-'+post_index) === undefined) {
			// .. add a like to the post..
			$scope.posts[post_index].likes++;
			// .. and set the like-cookie to true.
			$cookies.put('bn-like-post-'+post_index, true);
		}					
	}	
	
}

// Register the controller.
angular.module('braunianApp').controller('PostListController', PostListController);

// Inject the relevant factories and services.
PostListController.$inject = ['$scope', 'postFactory', '$stateParams', '$cookies', 'loginService'];

/**
 *	Navigation Controller.
 *	 
 * 	Controls the navigation between the categories
 *	(the list at the left side of the page).
 */

var NavigationController = function($scope, loginService) {
	
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
	
	// Get the logged in user, if there is one 
	// (used to show and hide controls for adminstrating posts and categories).
	$scope.user = loginService.loggedInUser();
	
	// Compute the total number of posts.
	var num = 0;
	for(var i = 0; i < $scope.categories.length; i++) {
		num = num + $scope.categories[i].num_posts;
	}
	
	$scope.total_num_posts = num;	
}

// Register the controller.
angular.module('braunianApp').controller('NavigationController', NavigationController);

// Inject the relevant factories and services.
NavigationController.$inject = ['$scope', 'loginService'];
'use strict';

angular.module('braunianApp')
		.constant('baseURL','http://localhost:3000/')
        .service('postFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            
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
			
			this.getPosts = function(category) {
				// Will contain all the posts from the category.
				var posts_current_cat = [];
				
				// If the category is 'all_posts': return all posts. 
				if(category === "all_posts") {					
					for(var i = 0; i < posts.length; i++) {						
						var post = posts[i];
						post.content_preview = post.content.slice(0,250) + "...";
						posts_current_cat.push(post);
					}
				}
				else {
					for(var i = 0; i < posts.length; i++) {
						if(posts[i].category === category){
							var post = posts[i];
							post.content_preview = post.content.slice(0,250) + "...";
							posts_current_cat.push(post);
						}						
					}
				}
				
				return posts_current_cat;
			}
			
			this.getPost = function(id) {
				
				for(var i = 0; i < posts.length; i++) {					
					if(posts[i].id == id){
						console.log(id);
						return posts[i];
					}						
				}
			}
			
        }])		
;



var LoginService = function($http, $state, $cookies) {
	
	this.login = function(credentials, onSuccess, onError) {
		
		$http.post('http://localhost:8080/api/login', credentials).then(
		
			function(response) {				
				if(response.data.name) {
					
					$cookies.put('bn-user', response.data.name);
										
					onSuccess(response.data.name);
				}					
			}, 
			
			function(response) {
								
				onError(response);
		});
	}
	
	this.loggedInUser = function() {
		
		if($cookies.get('bn-user') !== undefined) {
			return $cookies.get('bn-user');
		}
		else {
			return null;
		}
	}
	
	/**
	 *	Log the current user out.
	 */
	this.logout = function(onLogout) {
		$cookies.remove('bn-user');
		onLogout();
	} 
	
}

angular.module('braunianApp').service('loginService', LoginService)

LoginService.$inject = ['$http', '$state', '$cookies'];


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
					'navigation': {
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
					'navigation': {
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

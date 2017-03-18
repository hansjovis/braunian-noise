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

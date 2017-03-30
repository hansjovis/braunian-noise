/**
 *	Controller Template.
 *	 
 *	[Controller description]
 */
var NewPostController = function($scope) {
	
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
	
	$scope.row_types = ["text", "header 1", "header 2", "text - image", "image", "image - text"];
	$scope.current_row_type = "text";
	$scope.current_row_id = 0;
	
	// Model of the current post, for two-way databinding purposes.
	$scope.post = {
		id: 0,
		title: "",
		header_img: {},
		categories: [],
		author:	"",
		created_on: "",
		likes: 0,
		contents: []
	}
	
	$scope.upload_header_img = function() {
		var file = document.getElementById('post_img_input').files[0];
					
		document.getElementById('header_image').src = window.URL.createObjectURL(file);
					
		console.log(file);
	}
	
	$scope.add_row = function() {
		console.log($scope.current_row_type);
		
		var new_row = {};
		$scope.current_row_id++;
		
		switch($scope.current_row_type) {
			
			case "text":
					new_row = {
						id: $scope.current_row_id,
						type: "text", 
						text: ""
					};				
				break;
			case "header 1":
					new_row = {
						id: $scope.current_row_id,
						type: "header 1",
						text: ""
					};
				break;
			default:
				break;
		};
		
		$scope.post.contents.push(new_row);
	}
	
};

// Register the controller.
angular.module('braunianApp').controller('NewPostController', NewPostController);

// Inject the relevant factories and services.
NewPostController.$inject = ['$scope'];
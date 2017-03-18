
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
/**
 *	Controller Template.
 *	 
 *	[Controller description]
 */

var LoginController = function($scope, $stateParams, $state, loginService) {
	
	// Entered credentials.
	$scope.credentials = {
		username: "",
		password: ""
	};
	
	// Current error that should be shown to the user,
	// e.g. "Wrong username or password."
	$scope.error = $stateParams.error;
	
	/**
	 *	Log-in function.
	 */
	$scope.login = function() {
		
		// Log-in using the login service.
		loginService.login($scope.credentials,
			// Function to execute after succesful log-in.
			function(screenname) {
				console.log("Welcome "+screenname+"!");
				// Go to the blog-post list.
				$state.go('app.posts_category', {cat : 'all_posts'});				
			},
			// Function to execute after unsuccesful log-in.
			function(response) {
				// Go back to the login page, but show an error.
				$state.go('app.login',{ error : "Wrong user name or password." });
			}
		
		);					
	};
	
};

// Register the controller.
angular.module('braunianApp').controller('LoginController', LoginController);

// Inject the relevant factories and services.
LoginController.$inject = ['$scope', '$stateParams', '$state', 'loginService'];
/**
 *	Post List Controller
 *
 *	Controls the logic of the list of blog posts.
 *	E.g. filtering out the posts not belonging to the current category.
 *	 
 */
var PostListController = function($scope, postsService, $stateParams, $cookies, loginService) {
	
	// Get the current category from the URL.
	$scope.current_cat = $stateParams.cat;
	
	// Get all the posts for this category.
	$scope.posts = postsService.getPosts($scope.current_cat);
	
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
			function(response) {
				window.location.reload();
			},
			function(response) {
				console.log(response);
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
PostListController.$inject = ['$scope', 'postsService', '$stateParams', '$cookies', 'loginService'];
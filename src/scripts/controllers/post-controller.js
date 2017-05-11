




var PostController = function($scope, postsService, $stateParams) {
	
	// Get the post, based on the post-ID in the URL.
	$scope.post = postsService.getPost($stateParams.id);
	
};

// Register the controller.
angular.module('braunianApp').controller('PostController', PostController);

// Inject the relevant factories and services.
PostController.$inject = ['$scope', 'postsService', '$stateParams'];
/**
 *	Service for CRUD-operations on the blog posts.	
 *
 */
 
var NewPostsService = function($http) {
	
	/** URL to the API. */
	var API_URL = 'http://localhost:8080/api/';
	
	/**
	 *	Uploads a new blog post to the server.
	 *	@param {Object} post_data - the data containing the contents of the post.
	 *	@param {function} onSuccess - the function to be executed when the post has been succesfuly uploaded.
	 *	@param {function} onError - the function to be executed when an error occurred when uploading.
	 */
	this.upload_post = function(post_data, onSuccess, onError) {
		// Try to post the new blog post.
		$http.post(API_URL + 'upload-post', post_data).then(
			// When succesfull
			function(response) {
				// Send back the data.
				onSuccess(response.data);
			},
			// When not...
			function(response) {
				// Execute the error function.				
				onError(response);
			}
		);
	}
	
	/**
	 *	Uploads a new image to the server.	 
	 */
	this.upload_image = function(image_blob, on_success, on_error) {
				
		var formData = new FormData();
		formData.append('image', image_blob);
		
		var conf = {transformRequest: angular.identity};
		conf.headers = {'Content-Type': undefined};
		
		$http.post(API_URL + 'upload-image', formData, conf).then(
			// When succesfull
			function(response) {
				on_success(response.data);
			},
			// When not...
			function(response) {
				console.log(response);
			}
		);

	}
	
}

// Register the Angular service.
angular.module('braunianApp').service('newPostsService', NewPostsService);

// Inject the relevant factories and services.
PostsService.$inject = ['$http'];
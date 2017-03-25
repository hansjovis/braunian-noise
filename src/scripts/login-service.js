
/**
 *	Service for logging into the Braunian Noise website.
 */
var LoginService = function($http, $state, $cookies) {
	
	/**
	 *	Primary login function.
	 * 		@param {object} credentials the entered credentials as an object in the form: { username: "username", password: "password"}
	 *		@param {function} onSuccess(username) the function to be executed after succesfuly logging in.
	 *		@param {function} onError(response) the function to be executed after unsuccessfuly trying to log in.
	 */
	this.login = function(credentials, onSuccess, onError) {
		// Try to login on the server using the given credentials.
		$http.post('http://localhost:8080/api/login', credentials).then(
			// When succesfull
			function(response) {				
				if(response.data.name) {
					// Simple session storage using a cookie,
					// stores the user's name.
					$cookies.put('bn-user', response.data.name);
					// Execute the success function.					
					onSuccess(response.data.name);
				}					
			}, 
			// When not...
			function(response) {
				// Execute the error function.				
				onError(response);
		});
	}
	
	/**
	 *	Get the currently logged in user, when available.
	 *	@returns {string} the username of the currently logged in user, null if no user is currently logged in. 
	 */
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
	 *	@param {function} onLogout the function to execute after succesfuly logging out.
	 */
	this.logout = function(onLogout) {
		$cookies.remove('bn-user');
		onLogout();
	} 
	
}

// Register the service.
angular.module('braunianApp').service('loginService', LoginService)

// Inject the relevant factories and services.
LoginService.$inject = ['$http', '$state', '$cookies'];


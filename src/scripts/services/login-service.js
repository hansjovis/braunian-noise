
/**
 *	Service for loggin in and -out of the Braunian Noise website.
 */
var LoginService = function($http, $state, $cookies) {
	
	var API_ROUTE = 'http://localhost:8080/api/';
	
	var LOGIN_API_ROUTE = API_ROUTE + 'login';
	var LOGOUT_API_ROUTE = API_ROUTE + 'logout';
	var USER_PROFILE_ROUTE = API_ROUTE + 'profile';
	
	/**
	 *	Primary login function.
	 * 		@param {object} credentials the entered credentials as an object in the form: { username: "username", password: "password"}
	 *		@param {function} onSuccess(username) the function to be executed after succesfuly logging in.
	 *		@param {function} onError(response) the function to be executed after unsuccessfuly trying to log in.
	 */
	this.login = function(credentials, onSuccess, onError) {
		// Try to login on the server using the given credentials.
		$http.post(LOGIN_API_ROUTE, credentials).then(
			// When succesfull
			function(response) {	
				if(response.data.username) {
					// Simple session storage using cookies,
					// stores the user's user name.
					$cookies.put('bn-session', response.data.id);
					// Store the returned user profile in an object.
					var userProfile = {
						username: response.data.username,
						screenname: response.data.screenname						
					};					
					// Execute the success function.					
					onSuccess(userProfile);
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
		if($cookies.get('bn-session') !== undefined) {
			return $http.post
		}
		else {
			return null;
		}
	}
	
	/**
	 *	Log the current user out.
	 *	@param {function} onSuccess - the function to execute after succesfuly logging out.
	 *	@param {function} onError - the function to execute if unsuccessfuly logging out.
	 */
	this.logout = function(onSuccess, onError) {
		
		// Logout.
		$http.post(LOGOUT_API_ROUTE).then(
			// When succesfull
			function(response) {
				// Remove the session cookies.
				$cookies.remove('bn-session');
				onSucces(response);
			},
			// When not...
			function(response) {
				onError(response);
			}
		
		);
	} 
	
}

// Register the service.
angular.module('braunianApp').service('loginService', LoginService);

// Inject the relevant factories and services.
LoginService.$inject = ['$http', '$state', '$cookies'];


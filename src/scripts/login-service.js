

var LoginService = function($http, $state, $cookies) {
	
	this.login = function(credentials, onSuccess, onError) {
		
		$http.post('http://localhost:8080/api/login', credentials).then(
		
			function(response) {				
				if(response.data.name) {
					
					$cookies.put('bn-user', response.data.name);
										
					onSuccess(response.data.name);
				}					
			}, 
			
			function(response) {
								
				onError(response);
		});
	}
	
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
	 */
	this.logout = function(onLogout) {
		$cookies.remove('bn-user');
		onLogout();
	} 
	
}

angular.module('braunianApp').service('loginService', LoginService)

LoginService.$inject = ['$http', '$state', '$cookies'];


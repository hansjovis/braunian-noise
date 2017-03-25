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
;

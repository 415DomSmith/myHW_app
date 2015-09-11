app.controller("HomeController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.test = "TEST";
}]);

app.controller("LoginController", ["$scope", "$location", "$http", "$auth", function ($scope, $location, $http, $auth){
	$scope.authenticateUser = function(){

		console.log("hello")
		$auth.authenticate('google_oauth2')
		.then(function(resp){
			$location.path("/")
		})
	}
	
}]);

app.controller("AdditionalInfoController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.submitAdditionalInfo = function() {
		console.log("hello")
		console.log($scope.teacher)
		console.log($scope.student)
	}
}]);

app.controller("GlobalController", ["$scope", "$location", "$http","$rootScope", function ($scope, $location, $http, $rootScope){
	$rootScope.$on('auth:login-success', function(ev, user) {
		console.log(ev)
		console.log(user)
		// $rootScope.$apply(function() {
		    $location.path("/");
		    // console.log($location.path());
		// });
	});
}]);
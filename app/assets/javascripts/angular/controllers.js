app.controller("HomeController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.test = "TEST";
}]);

app.controller("StudentLoginController", ["$scope", "$location", "$http", "$auth", function ($scope, $location, $http, $auth){
	$scope.authenticate = function(){
		$auth.authenticate('google_oauth2', {params: {isTeacher: true}})
		.then(function(resp){
			console.log(resp)
		})
	}
}]);
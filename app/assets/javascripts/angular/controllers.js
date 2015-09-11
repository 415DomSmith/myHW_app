app.controller("HomeController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.test = "TEST";
}]);

app.controller("LoginController", ["$scope", "$location", "$http", "$auth", function ($scope, $location, $http, $auth){
	$scope.authenticateUser = function(){

		console.log("hello");
		$auth.authenticate('google_oauth2')
		.then(function(resp){
			// $location.path("/users/")
		});
	};
}]);


app.controller("LocalUploadController", ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file !== null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $scope.upload = Upload.upload({
                    url: 'localhost:3000/',
                    method: 'POST',
                    fields: { 'user[name]': $scope.name },
                    file: file,
                    fileFormDataName: 'user[image]'
                });
            }
        }
    };
}]);

app.controller("AdditionalInfoController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.submitAdditionalInfo = function() {
		// console.log("hello")
		console.log($scope.formData);
		// console.log($scope.student)
	};
}]);

app.controller("GlobalController", ["$scope", "$location", "$http","$rootScope", function ($scope, $location, $http, $rootScope){
	$rootScope.$on('auth:login-success', function(ev, user) {
		console.log(ev);
		console.log(user);
		$location.path("/users/" + user.id + "/additional_info");
	});
}]);
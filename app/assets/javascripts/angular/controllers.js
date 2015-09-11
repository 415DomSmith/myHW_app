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
              if (!file.$error) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
              }
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
app.controller("HomeController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.test = "TEST";
}]);

// ==================================================
// LOGIN CONTROLLER ==
// ==================================================

app.controller("LoginController", ["$scope", "$location", "$http", "$auth", function ($scope, $location, $http, $auth){
	$scope.authenticateUser = function(){
	//Send authentication request to Google
		$auth.authenticate('google_oauth2');
	};
}]);

// ==================================================
// ADDITIONAL INFO CONTROLLER ==
// ==================================================

app.controller("AdditionalInfoController", ["$scope", "$location", "User", "$routeParams", "School", function ($scope, $location, User, $routeParams, School){

	//Find user to update
	$scope.user = User.get({id: $routeParams.id});

	//Find schools to add to user
	$scope.schools = School.query();

	$scope.submitAdditionalInfo = function(id) {
		

		// Check if they are student or teacher
		if($scope.formData.teacher) {
			$scope.user.isTeacher = true;
		} else if ($scope.formData.student) {
			$scope.user.isTeacher = false;
		}

		//Check if they are male or female
		if($scope.formData.female) {
			$scope.user.isFemale = true;
		} else if ($scope.formData.male) {
			$scope.user.isFemale = false;
		}

		//Choose the school the teacher/student is a part of.
		$scope.user.school = $scope.formData.school

		// Update the user
		$scope.user.$update({id: $routeParams.id}).then(function() {
        	$location.path('/users/' + $routeParams.id );
      	});
	};
}]);

// ==================================================
// DASHBOARD (USER SHOW) CONTROLLER ==
// ==================================================

app.controller("DashboardController", ["$scope", "$location", "User", "$routeParams", "School", function ($scope, $location, User, $routeParams, School){
	$scope.user = User.get({id: $routeParams.id});
	$scope.toCoursesNew = function(){
		$location.path("/courses/new")
	}
}]);

// ==================================================
// COURSES NEW CONTROLLER ==
// ==================================================

app.controller("CoursesNewController", ["$scope", "$location","$rootScope", "Course", function ($scope, $location, $rootScope, Course){
	$scope.courses = "yeah"
	$scope.createCourse = function(){
		var course = $scope.courseData
		course.teacherId = parseInt($rootScope.user_id);
		var newCourse = new Course(course)
		newCourse.$save().then(function(){
			$location.path("/users/" + $rootScope.user_id)
		})

	}
}]);

// ==================================================
// LOCAL UPLOAD (PAPERCLIP) FOR DOCUMENTS CONTROLLER=
// ==================================================

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
                    url: 'http://localhost:3000/api/documents',
                    method: 'POST',
                    fields: {},
                    file: file,
                    fileFormDataName: 'document[attachment]'
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


// ==================================================
// GLOBAL CONTROLLER FOR LOGIN AND LOGOUT EVENTS ==
// ==================================================
app.controller("GlobalController", ["$scope", "$location", "User","$rootScope", function ($scope, $location, User, $rootScope){
	
	//Listen for successful login and then redirect
	$rootScope.$on('auth:login-success', function(ev, user) {
		// console.log(ev);
		// console.log(user);

		// Find the user in the database to check if they're new or already have an account
		User.get({id: user.id})
			.$promise.then(function(loggedInUser){
	//Set user on rootScope for access everywhere
				console.log($rootScope)
				$rootScope.user_id = user.id
				console.log($rootScope)
				// If the user is new...
				if(loggedInUser.isNewUser) {
					$location.path("/users/" + user.id + "/additional_info");	
					//Redirect additional info page
				} else {
				// If not, send them to their dashboard
					$location.path("/users/" + user.id)
					
				}
			})
		
		
		
	});

	//TODO handle auth:login-failure gracefully
}]);
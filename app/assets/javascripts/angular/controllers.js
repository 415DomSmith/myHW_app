app.controller("HomeController", ["$scope", "$location", "$http", function ($scope, $location, $http){
	$scope.test = "WELCOME TO myHW.";
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

	console.log($scope.schools)

	$scope.submitAdditionalInfo = function(id) {
		

		// Check if they are student or teacher
		if($scope.formData.teacher) {
			$scope.user.isTeacher = true;
		} else if ($scope.formData.student){
			$scope.user.isTeacher = false;
		}

        //Check if they are male or female
        if($scope.formData.female) {
            $scope.user.isFemale = true;
        } else if ($scope.formData.male) {
            $scope.user.isFemale = false;
        }

		// Choose the school the teacher/student is a part of.
        $scope.user.school = $scope.formData.school

		$scope.user.$update({id: $routeParams.id}).then(function() {
        	$location.path('/users/' + $routeParams.id);
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
// ASSIGNMENTS NEW CONTROLLER ==
// ==================================================

app.controller("AssignmentsNewController", ["$scope", "$location","$rootScope", "Course", function ($scope, $location, $rootScope, Course){


}]);

// ==================================================
// LOCAL UPLOAD (PAPERCLIP) FOR DOCUMENTS CONTROLLER=
// ==================================================

app.controller("LocalUploadController", ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
//========== SETS A $WATCH ON UPLOAD DROP AND UPLOAD CLICK, CURRENTLY ONLY USING 'FILES' SCOPE VAR    
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {//'FILE' SCOPE VAR NOT IN USE
        if ($scope.file !== null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';
//======================= .UPLOAD BROUGHT IN FROM NG-FILE-UPLOAD || FIELDS {} CURRENTLY EMPTY BUT CAN BE USED TO PASS DATA IN THE FUTURE (FILE CREATOR?)
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) { //TODO -- .$ERROR IS TRIGGERING ERRORS IN THE CONSOLE (not breaking anything). MAKE THE RED GO AWAY.
                Upload.upload({
                    url: 'http://localhost:3000/api/users/:user_id/documents',
                    method: 'POST',
                    fields: {},
                    file: file,
                    fileFormDataName: 'document[attachment]' //===== [attachment] and fileFormDataName are what Paperclip are expecting. 
                }).progress(function (evt) { //TODO-- UPLOAD PROGRESS METER... BUILT IN TO NG-FILE-UPLOAD... MAKE IT PRETTY
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
// DOCUMENT LIBRARY CONTROLLER ======================
// ==================================================

app.controller("DocumentLibraryController", ["$scope", "$location", "$http", "$rootScope", function ($scope, $location, $http, $rootScope){
// ===== SENDS GET REQUEST TO DOCUMENT CONTROLLER ON BACKEND, RESPONSE IS LIST OF USERS DOCS   
    $scope.getUsersDocuments = function () {
        $http.get('/api/users/:user_id/documents').then(function (res) {
            $scope.userDocs = res.data;
            console.log($scope.userDocs);
        }, function (res) {
            console.log (res);
            $scope.userDocs = "Sorry, an error occurred. Please try again.";
        });
    }();
}]);




// ==================================================
// GLOBAL CONTROLLER FOR LOGIN AND LOGOUT EVENTS ==
// ==================================================
app.controller("GlobalController", ["$scope", "$location", "$http","$rootScope", function ($scope, $location, $http, $rootScope){
	$rootScope.$on('auth:login-success', function(ev, user) {
		console.log(ev);
		console.log(user);
		$location.path("/users/" + user.id + "/additional_info");
	});

	//TODO handle auth:login-failure gracefully
}]);





// Link local uploads to logged in user
// Display local files in users file library
// Get google drive docs
// Display users google drive docs 
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
	// $scope.courses = {}
    // $scope.user = {}
    $scope.userObj = User.get({id: $routeParams.id}, function(){
        $scope.courses = $scope.userObj.courses
        $scope.user = $scope.userObj.user
        console.log($scope.user)
    });
    // $scope.user = "blah"
    console.log($scope.courses)
	$scope.toCoursesNew = function(){
		$location.path("/courses/new");
	};
    $scope.toFileLibrary = function() {
        $location.path("/users/" + $routeParams.id + "/documentLibrary" );
    };
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
// COURSES SHOW CONTROLLER ==
// ==================================================

app.controller("CoursesShowController", ["$scope", "$location","$rootScope", "Course", "$routeParams", function ($scope, $location, $rootScope, Course, $routeParams){
    $scope.courseObj = Course.get({id: $routeParams.id}, function(){
      $scope.course = $scope.courseObj.course;
      $scope.assignments = $scope.courseObj.assignments  
    });
    // console.log($scope.courseObj)
    
}]);

// ==================================================
// COURSES EDIT CONTROLLER ==
// ==================================================

app.controller("CoursesEditController", ["$scope", "$location","$rootScope", "Course", "$routeParams","$rootScope", function ($scope, $location, $rootScope, Course, $routeParams, $rootScope){
    $scope.courseData = Course.get({id: $routeParams.id});
    $scope.updateCourse = function(){
        $scope.course = $scope.courseData;
        $scope.course.$update({id: $routeParams.id}).then(function() {
            $location.path('/courses/' + $routeParams.id);
        });
    };
    $scope.deleteCourse = function() {
        $scope.courseData.$delete({id: $routeParams.id}, function(){
            $location.path("/users/" + $rootScope.user_id)
        })
    }


}]);

// ==================================================
// ASSIGNMENTS NEW CONTROLLER ==
// ==================================================

app.controller("AssignmentsNewController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", function ($scope, $location, $rootScope, Assignment, $routeParams){
    $scope.createAssignment = function(){
        console.log($scope.assignmentData);
        var assignment = $scope.assignmentData;
        //Assign the correct category to the object before sending it off
        if(assignment.category === "class_participation"){
            assignment.class_participation = true;
        } else if(assignment.category === "classwork"){
            assignment.classwork = true;
        } else if(assignment.category === "homework") {
            assignment.homework = true;
        } else if (assignment.category === "project") {
            assignment.project = true;
        } else if (assignment.category === "quiz") {
            assignment.quiz = true;
        } else if (assignment.category === "reading") {
            assignment.reading = true;
        } else if (assignment.category === "test") {
            assignment.test = true;
        } else if (assignment.category === "miscellaneous") {
            assignment.miscellaneous = true;
        }

        var newAssignment = new Assignment(assignment)
        newAssignment.$save({course_id: $routeParams.course_id}).then(function(){
            $location.path("/courses/" + $routeParams.course_id)
        })
    };

}]);

// ==================================================
// ASSIGNMENTS SHOW CONTROLLER ==
// ==================================================

app.controller("AssignmentsShowController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", function ($scope, $location, $rootScope, Assignment, $routeParams){
  
    

}]);

// ==================================================
// LOCAL UPLOAD (PAPERCLIP) FOR DOCUMENTS CONTROLLER=
// ==================================================

app.controller("LocalUploadController", ['$scope', 'Upload', '$timeout', "$rootScope", "$routeParams", "$location", function ($scope, Upload, $timeout, $rootScope, $routeParams, $location) {
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
    $scope.toFileLibrary = function() {
        $location.path("/users/" + $routeParams.id + "/documentLibrary" );
    };
}]);

// ==================================================
// DOCUMENT LIBRARY CONTROLLER ======================
// ==================================================

app.controller("DocumentLibraryController", ["$scope", "$location", "$http", "$rootScope", "$routeParams", function ($scope, $location, $http, $rootScope, $routeParams){
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
// === TO UPLOAD LOCAL FILES VIEW ===
    $scope.toNewUpload = function(){
        $location.path("/users/" + $routeParams.id + "/upload");
    };
// === TO SELECT GOOGLE FILES VIEW ===
    $scope.toGooglePicker = function(){
        $location.path("/users/" + $routeParams.id + "/gDrive");
    };

    var clientId = '605204229077-4vs3h126rq01capco35b045nlf09vs36.apps.googleusercontent.com';
    var developerKey = 'AIzaSyD_QG50mpCMVrp0m5oMHY2UHL62G2Qj0-I';
    var clientSecret = 'H71cfMHC9ejDfp9c4S-bOEsC';
    var oauthToken;
    var pickerApiLoaded = false;
    var scope = ['https://www.googleapis.com/auth/drive.file'];

    $scope.onApiLoad = function () {
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker', {'callback': onPickerApiLoad});
    };

    
    function onAuthApiLoad() {
        window.gapi.auth.authorize(
            {
              'client_id': clientId,
              'scope': scope,
              'immediate': false
            },
            handleAuthResult);
    }

    function onPickerApiLoad() {
        pickerApiLoaded = true;
        createPicker();
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
          oauthToken = authResult.access_token;
          createPicker();
        }
    }

    // Create and render a Picker object for picking user Photos.
    function createPicker() {
        if (pickerApiLoaded && oauthToken) {
            var picker = new google.picker.PickerBuilder()
            .setOAuthToken(oauthToken)
            .setDeveloperKey(developerKey)
            .addView(new google.picker.DocsView())
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setCallback(pickerCallback)
            .build();
            picker.setVisible(true);
        }
    }
    // A simple callback implementation.
    function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];
        }
        var message = 'You picked: ' + url;
        console.log(data.docs);
        document.getElementById('result').innerHTML = message;
    }

}]);


// ==================================================
// GOOGLE DRIVE CONTROLLER ======================
// ==================================================

app.controller("GoogleDriveController", ["$scope", "$location", "$http", "$rootScope", "$routeParams", function ($scope, $location, $http, $rootScope, $routeParams){
    $scope.testing = "THIS IS FROM THE CONTROLLER";
    console.log = "FROM THE CONTROLLER";
    
    // var clientId = '605204229077-4vs3h126rq01capco35b045nlf09vs36.apps.googleusercontent.com';
    // var developerKey = 'AIzaSyD_QG50mpCMVrp0m5oMHY2UHL62G2Qj0-I';
    // var clientSecret = 'H71cfMHC9ejDfp9c4S-bOEsC';
    // var oauthToken;
    // var pickerApiLoaded = false;
    // var scope = ['https://www.googleapis.com/auth/drive.file'];

    // $scope.onApiLoad = function () {
    //     gapi.load('auth', {'callback': onAuthApiLoad});
    //     gapi.load('picker', {'callback': onPickerApiLoad});
    // };

    // $scope.onApiLoad();
    
    // function onAuthApiLoad() {
    //     window.gapi.auth.authorize(
    //         {
    //           'client_id': clientId,
    //           'scope': scope,
    //           'immediate': false
    //         },
    //         handleAuthResult);
    // }

    // function onPickerApiLoad() {
    //     pickerApiLoaded = true;
    //     createPicker();
    // }

    // function handleAuthResult(authResult) {
    //     if (authResult && !authResult.error) {
    //       oauthToken = authResult.access_token;
    //       createPicker();
    //     }
    // }

    // // Create and render a Picker object for picking user Photos.
    // function createPicker() {
    //     if (pickerApiLoaded && oauthToken) {
    //         var picker = new google.picker.PickerBuilder()
    //         .setOAuthToken(oauthToken)
    //         .setDeveloperKey(developerKey)
    //         .addView(new google.picker.DocsView())
    //         .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    //         .setCallback(pickerCallback)
    //         .build();
    //         picker.setVisible(true);
    //     }
    // }
    // // A simple callback implementation.
    // function pickerCallback(data) {
    //     var url = 'nothing';
    //     if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    //         var doc = data[google.picker.Response.DOCUMENTS][0];
    //         url = doc[google.picker.Document.URL];
    //     }
    //     var message = 'You picked: ' + url;
    //     document.getElementById('result').innerHTML = message;
    // }

}]);



// ==================================================
// GLOBAL CONTROLLER FOR LOGIN AND LOGOUT EVENTS ==
// ==================================================
app.controller("GlobalController", ["$scope", "$location", "$http","$rootScope", "User", function ($scope, $location, $http, $rootScope, User){
	$rootScope.$on('auth:login-success', function(ev, user) {
              // Find the user in the database to check if they're new or already have an account
       User.get({id: user.id})
               .$promise.then(function(loggedInUser){
//Set user on rootScope for access everywhere
                       // console.log($rootScope)
                       $rootScope.user_id = loggedInUser.user.id
                       // console.log($rootScope)
                       // If the user is new...
                       if(loggedInUser.user.isNewUser) {
                               $location.path("/users/" + loggedInUser.user.id + "/additional_info");  
                       } else if(loggedInUser.isNewUser) {
                           $location.path("/users/" + loggedInUser.user.id + "/additional_info");       
                               //Redirect additional info page
                       } else {
                       // If not, send them to their dashboard
                           $location.path("/users/" + loggedInUser.user.id)
                               
                       }
               })
	});

	//TODO handle auth:login-failure gracefully
}]);





// Link local uploads to logged in user
// Display local files in users file library
// Get google drive docs
// Display users google drive docs 
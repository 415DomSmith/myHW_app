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
        $scope.submissions = $scope.userObj.submissions
        // console.log($scope.user)
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
    //Getting course and assignment back from active record
    $scope.courseObj = Course.get({id: $routeParams.id}, function(){
      $scope.course = $scope.courseObj.course;
      $scope.assignments = $scope.courseObj.assignments;  
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
// ASSIGNMENTS NEW CONTROLLER ======================
// ==================================================


app.controller("AssignmentsNewController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Document", function ($scope, $location, $rootScope, Assignment, $routeParams, Document){
//Get users documents to be attached to an assignment    
    $scope.getUsersDocuments = Document.query(function(){
        $scope.userDocs = $scope.getUsersDocuments;
        console.log($scope.userDocs);
    });
    $scope.assignmentData = {}
    $scope.assignmentData.documents = {};
    $scope.createAssignment = function(){
        // console.log($scope.assignmentData);   
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

        console.log(assignment.documents);

        var newAssignment = new Assignment(assignment);
        newAssignment.$save({course_id: $routeParams.course_id}).then(function(){
            $location.path("/courses/" + $routeParams.course_id);
        });
    };

     
}]);

// ==================================================
// ASSIGNMENTS SHOW CONTROLLER ==
// ==================================================

app.controller("AssignmentsShowController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Course", function ($scope, $location, $rootScope, Assignment, $routeParams, Course){
  
      
    $scope.assignment = Assignment.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}, function(){
        console.log($scope.assignment)    
    })
    $scope.courseObj = Course.get({id: $routeParams.course_id}, function(){
        $scope.course = $scope.courseObj.course
    })
    
}]);

// ==================================================
// ASSIGNMENTS EDIT CONTROLLER ==
// ==================================================
// TODO: Look up how to refactor new and edits so code is DRYer
app.controller("AssignmentsEditController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Course", function ($scope, $location, $rootScope, Assignment, $routeParams, Course){
      
    // $scope.courseData = Course.get({id: $routeParams.id});
    $scope.assignmentData = Assignment.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id})

    $scope.updateAssignment = function(){
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

        assignment.$update({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}).then(function() {
            $location.path('/courses/' + $routeParams.course_id) + "/assignments/" + $routeParams.assignment_id;
        });
    };

    $scope.deleteAssignment = function(){
        $scope.assignmentData.$delete({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}, function(){
            $location.path("/users/" + $rootScope.user_id)
        })
    }
}]);

// ==================================================
// SUBMISSIONS NEW CONTROLLER ==
// ==================================================

app.controller("SubmissionsNewController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){
  $scope.createSubmission = function(){
    console.log($scope.submissionData)
    var submission = $scope.submissionData
    var newSubmission = new Submission(submission)
    console.log(submission)
    newSubmission.$save({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}).then(function(){
        $location.path("/users/" + $rootScope.user_id)
    })
  }
    
}]);

// ==================================================
// SUBMISSIONS NEW CONTROLLER ==
// ==================================================

app.controller("SubmissionsShowController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){

    $scope.submission = Submission.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id})

    $scope.deleteSubmission = function(){
        $scope.submission.$delete({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id}, function(){
            $location.path("/users/" + $rootScope.user_id)
        })
    }

}]);

// ==================================================
// SUBMISSIONS EDIT (FOR STUDENTS) CONTROLLER ==
// ==================================================

app.controller("SubmissionsEditController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){

    $scope.submissionData = Submission.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id})
    $scope.updateSubmission = function() {
        var submission = $scope.submissionData
        submission.$update({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id}).then(function(){
            $location.path("/users/" + $rootScope.user_id)
        })
    }

}]);

// ==================================================
// SUBMISSIONS SCORE (FOR TEACHERS) CONTROLLER ==
// ==================================================

app.controller("SubmissionsScoreController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){
    $scope.submissionData = Submission.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id})
    $scope.scoreSubmission = function() {
        var submission = $scope.submissionData
        submission.$update({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id}).then(function(){
            $location.path("/users/" + $rootScope.user_id)
        })
    }


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
//======================= .UPLOAD BROUGHT IN FROM NG-FILE-UPLOAD | FIELDS {} CURRENTLY EMPTY BUT CAN BE USED TO PASS DATA IN THE FUTURE (FILE CREATOR?)
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

app.controller("DocumentLibraryController", ["$scope", "$location", "$http", "$rootScope", "$routeParams", "Document", function ($scope, $location, $http, $rootScope, $routeParams, Document){
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
//========TODO -- MOVE API KEYS==============
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

    // Create and render a Picker object for picking user files.
    function createPicker() {
        if (pickerApiLoaded && oauthToken) {
            var picker = new google.picker.PickerBuilder()
            .setOAuthToken(oauthToken)
            .setDeveloperKey(developerKey)
            .addView(new google.picker.DocsView())
            // .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setCallback(pickerCallback)
            .build();
            picker.setVisible(true);
        }
    }
    // callback implementation to post to back-end.
    function pickerCallback(data) {
        var url, description, gId, fileType, name, parentId;
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = data.docs[0].url;
            description = data.docs[0].url;
            gId = data.docs[0].id;
            fileType = data.docs[0].mimeType;
            name = data.docs[0].name;
            parentId = data.docs[0].parentId;

            var file = {
                google_drive_id: gId,
                description: description,
                google_drive_url: url,
                file_type: fileType,
                google_doc_name: name,
                drive_parent_id: parentId,
            };

            var newDriveFile = new Document(file);
                newDriveFile.$save().then(function(){
                    console.log("File Saved Locally");
                    $scope.getUsersDocuments();
            });
            // console.log(data.docs[0]);


        }
//TODO - BUILD A WIDGET OR SOMETHING TO NOTIFY USER WHAT FILE WAS BROUGHT IN AND IF IT WAS SUCCESSFUL
        var message = 'You picked: ' + fileType;
       
        document.getElementById('result').innerHTML = message;
    }

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
                       console.log($rootScope)
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
    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log(current);
        if (!$rootScope.user_id) {
            $location.url("/login/");
        }
        

    });
	//TODO handle auth:login-failure gracefully
}]);





// Link local uploads to logged in user
// Display local files in users file library
// Get google drive docs
// Display users google drive docs 
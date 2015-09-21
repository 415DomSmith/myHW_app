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


//TODO -- Fix the get on the user (need userObj now. search it for examples)


app.controller("AdditionalInfoController", ["$scope", "$location", "User", "$routeParams", "School", function ($scope, $location, User, $routeParams, School){

	//Find user to update
	$scope.user = User.get({id: $routeParams.id});

	//Find schools to add to user
	$scope.schools = School.query();


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
    // Get all info about the user to display it in dashboard
    $scope.userObj = User.get({id: $routeParams.id}, function(){
        $scope.user = $scope.userObj.user;
        $scope.courses = $scope.userObj.courses;
        $scope.submissions = $scope.userObj.submissions;
        $scope.assignments = $scope.userObj.assignments;
    });

}]);

// ==================================================
// COURSES NEW CONTROLLER ==
// ==================================================

app.controller("CoursesNewController", ["$scope", "$location","$rootScope", "Course", "School","User", function ($scope, $location, $rootScope, Course, School, User){
    // $scope.courseObj = Course.get({id: $routeParams.id},function(){
    //     $scope.students = $scope.courseObj.students;
    // });
    $scope.courseData = {}
    $scope.courseData.ids = [];
    User.get({id: $rootScope.user_id }, function(user){
        $scope.school = user.schools[0];
        var school_id = user.schools[0].id;
        School.get({id: school_id }, function(school){
            $scope.students = school.users;
        });
    });

    
    $scope.createCourse = function(){
        var course = $scope.courseData;
        course.teacherId = parseInt($rootScope.user_id);
        var newCourse = new Course(course);
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
      $scope.announcements = $scope.courseObj.announcements
    });
    
}]);

// ==================================================
// COURSES EDIT CONTROLLER ==
// ==================================================

app.controller("CoursesEditController", ["$scope", "$location","$rootScope", "Course", "$routeParams","$rootScope", function ($scope, $location, $rootScope, Course, $routeParams, $rootScope){
    $scope.courseObj = Course.get({id: $routeParams.id},function(){
        $scope.courseData = $scope.courseObj.course;
        $scope.students = $scope.courseObj.students;
        $scope.enrolledStudents = $scope.courseObj.enrolled_students;
        $scope.courseData.ids = [];

        $scope.enrolledStudents.forEach(function(student){
            $scope.courseData.ids[student.id] = student.id;
        });


    });

    $scope.updateCourse = function(){
        $scope.courseObj.course = $scope.courseData;

        $scope.courseObj.$update({id: $routeParams.id}).then(function() {
            $location.path('/courses/' + $routeParams.id + "/commandcenter");
        });
    };

    $scope.deleteCourse = function() {
        $scope.courseObj.$delete({id: $routeParams.id}, function(){
            $location.path("/users/" + $rootScope.user_id);
        });
    };


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
    $scope.assignmentData = {};
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

        var newAssignment = new Assignment(assignment);
        newAssignment.$save({course_id: $routeParams.course_id}).then(function(){
            $location.path("/courses/" + $routeParams.course_id + "/commandcenter");
        });
    };
    //Text editor options for creating a new assignment.
    $scope.tinymceOptions = {
        inline: false,
        statusbar: false,
        plugins: 'autolink colorpicker save autosave image link paste print spellchecker table textcolor',
        skin: 'lightgray',
        theme: 'modern'
    };

     
}]);

// ==================================================
// ASSIGNMENTS SHOW CONTROLLER ==
// ==================================================

app.controller("AssignmentsShowController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Course", function ($scope, $location, $rootScope, Assignment, $routeParams, Course){
  
      
    $scope.assignmentObj = Assignment.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}, function(){
        $scope.documents = $scope.assignmentObj.documents;
        $scope.assignment = $scope.assignmentObj.assignment;
    });

    $scope.courseObj = Course.get({id: $routeParams.course_id}, function(){
        $scope.course = $scope.courseObj.course;
    });
    //Text editor options for displaying an assignment, without the toolbars.
     $scope.tinymceOptions = {
        inline: false,
        toolbar: false,
        menubar: false,
        statusbar: false,
        plugins: '',
        skin: 'lightgray',
        theme: 'modern'
    };
    
}]);

// ==================================================
// ASSIGNMENTS EDIT CONTROLLER ==
// ==================================================
// TODO: Look up how to refactor new and edits so code is DRYer
app.controller("AssignmentsEditController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Course", "Document", function ($scope, $location, $rootScope, Assignment, $routeParams, Course, Document){
    $scope.assignmentDocuments = [];
    // $scope.courseData = Course.get({id: $routeParams.id});
    $scope.assignmentObj = Assignment.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}, function(){
        $scope.assignmentData = $scope.assignmentObj.assignment;
        $scope.assignmentDocuments = $scope.assignmentObj.documents;
        console.log($scope.assignmentObj);
    });

    $scope.getUsersDocuments = Document.query(function(){
        $scope.userDocs = $scope.getUsersDocuments;
        $scope.userDocs.forEach(function(userDoc){
            $scope.assignmentDocuments.forEach(function(assignedDoc){
                if ( userDoc.id == assignedDoc.id ) {
                    userDoc.checked = true;
                } else {
                    userDoc.checked = false;
                }
            });
        });
        


        //loop through userDocs
        //loop through assignmentDocuments
        //compare userDocs id to assignmentDocuments id
        //assign true value to userDocs for every document in assignment docs present
        //display userDocs with correct check boxes.
        //on form update, save checkbox values.


    });

    $scope.updateAssignment = function(){
        $scope.assignmentObj.assignment = $scope.assignmentData;
        //Assign the correct category to the object before sending it off
        if($scope.assignmentObj.assignment.category === "class_participation"){
            $scope.assignmentObj.assignment.class_participation = true;
        } else if($scope.assignmentObj.assignment.category === "classwork"){
            $scope.assignmentObj.assignment.classwork = true;
        } else if($scope.assignmentObj.assignment.category === "homework") {
            $scope.assignmentObj.assignment.homework = true;
        } else if ($scope.assignmentObj.assignment.category === "project") {
            $scope.assignmentObj.assignment.project = true;
        } else if ($scope.assignmentObj.assignment.category === "quiz") {
            $scope.assignmentObj.assignment.quiz = true;
        } else if ($scope.assignmentObj.assignment.category === "reading") {
            $scope.assignmentObj.assignment.reading = true;
        } else if ($scope.assignmentObj.assignment.category === "test") {
            $scope.assignmentObj.assignment.test = true;
        } else if ($scope.assignmentObj.assignment.category === "miscellaneous") {
            $scope.assignmentObj.assignment.miscellaneous = true;
        };

        $scope.assignmentObj.$update({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}).then(function() {
            $location.path('/courses/' + $routeParams.course_id + "/commandcenter");
        });
    };

    $scope.deleteAssignment = function(){
        $scope.assignmentObj.$delete({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}, function(){
            $location.path("/courses/" + $routeParams.course_id + "/commandcenter" );
        });
    };
    //Text editor options for updating a new assignment.
    $scope.tinymceOptions = {
        inline: false,
        plugins: 'autolink colorpicker save autosave image link paste print spellchecker table textcolor',
        skin: 'lightgray',
        theme: 'modern'
    };
}]);

// ==================================================
// SUBMISSIONS NEW CONTROLLER =======================
// ==================================================

app.controller("SubmissionsNewController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){
        
    $scope.assignmentObj = Assignment.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}, function () {
         $scope.assignment = $scope.assignmentObj.assignment;
     });
    
   

    $scope.createSubmission = function(){
        // console.log($scope.submissionData)
        var submission = $scope.submissionData;
        var newSubmission = new Submission(submission);
        // console.log(submission);
        newSubmission.$save({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id}).then(function(){
            $location.path("/users/" + $rootScope.user_id);
        });
    };
    //Text editor options for entering a new submission
    $scope.tinymceOptions = {
        inline: false,
        plugins: 'autolink colorpicker save autosave image link paste print spellchecker table textcolor wordcount',
        skin: 'lightgray',
        theme: 'modern'
    };
    //Text editor options to render the text box without toolbars (to just display the text).
    $scope.tinymceOptions2 = {
        inline: false,
        toolbar: false,
        menubar: false,
        statusbar: false,
        plugins: '',
        skin: 'lightgray',
        theme: 'modern'
    };
    
}]);

// ==================================================
// SUBMISSIONS SHOW CONTROLLER ==
// ==================================================

app.controller("SubmissionsShowController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){

    $scope.submission = Submission.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id});
    // console.log($scope.submission);
    $scope.deleteSubmission = function(){
        $scope.submission.$delete({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id}, function(){
            $location.path("/users/" + $rootScope.user_id);
        });
    };

    $scope.tinymceOptions = {
        inline: false,
        toolbar: false,
        menubar: false,
        plugins: 'wordcount',
        skin: 'lightgray',
        theme: 'modern'
    };

}]);

// ==================================================
// SUBMISSIONS EDIT (FOR STUDENTS) CONTROLLER ==
// ==================================================

app.controller("SubmissionsEditController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){

    $scope.submissionData = Submission.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id});
    $scope.updateSubmission = function() {
        var submission = $scope.submissionData;
        submission.$update({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id}).then(function(){
            $location.path("/users/" + $rootScope.user_id);
        });
    };

    //Text editor options for entering a new submission
    $scope.tinymceOptions = {
        inline: false,
        plugins: 'autolink colorpicker save autosave image link paste print spellchecker table textcolor wordcount',
        skin: 'lightgray',
        theme: 'modern'
    };

}]);

// ==================================================
// SUBMISSIONS SCORE (FOR TEACHERS) CONTROLLER ==
// ==================================================

app.controller("SubmissionsScoreController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", function ($scope, $location, $rootScope, Assignment, $routeParams, Submission){
    $scope.submissionData = Submission.get({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id});
    $scope.scoreSubmission = function() {
        var submission = $scope.submissionData;
        submission.$update({course_id: $routeParams.course_id, assignment_id: $routeParams.assignment_id, submission_id: $routeParams.submission_id}).then(function(){
            $location.path("/courses/" + $routeParams.course_id + "/commandcenter");
        });
    };

    $scope.tinymceOptions = {
        inline: false,
        toolbar: false,
        menubar: false,
        plugins: 'wordcount',
        skin: 'lightgray',
        theme: 'modern'
    };


}]);

// ==================================================
// ANNOUNCEMENTS NEW CONTROLLER ==
// ==================================================

app.controller("AnnouncementsNewController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Announcement", function ($scope, $location, $rootScope, Assignment, $routeParams, Announcement){
        
    $scope.announcementData = {};


    $scope.createAnnouncement = function(){
        var announcement = $scope.announcementData;
        announcement.date = Date.now();
        console.log(announcement.date)
        console.log(Date.now())
        var newAnnouncement = new Announcement(announcement)
        newAnnouncement.$save({course_id: $routeParams.id}).then(function(){
            $location.path("/courses/" + $routeParams.id + "/commandcenter");
        });
    }

}]);

// ==================================================
// ANNOUNCEMENTS EDIT CONTROLLER ==
// ==================================================

app.controller("AnnouncementsEditController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Announcement", function ($scope, $location, $rootScope, Assignment, $routeParams, Announcement){
        
    $scope.announcementData = Announcement.get({course_id: $routeParams.id, announcement_id: $routeParams.announcement_id});
    $scope.updateAnnouncement = function() {
        var announcement = $scope.announcementData;
        announcement.$update({course_id: $routeParams.id, announcement_id: $routeParams.announcement_id}).then(function(){
            // debugger
            $location.path("/courses/" + $routeParams.id + "/commandcenter/");
        });
    };

    $scope.deleteAnnouncement = function(){
        // debugger
        console.log($scope.announcementData)
      $scope.announcementData.$delete({course_id: $routeParams.id, announcement_id: $scope.announcementData.id}, function(){
          $location.path("/courses/" + $routeParams.id + "/commandcenter" );
      });
    };

}]);

// ==================================================
// COMMAND CENTER CONTROLLER ==
// ==================================================

app.controller("CommandCenterController", ["$scope", "$location","$rootScope", "Assignment", "$routeParams", "Submission", "Course", 'SubmissionsForCourse', function ($scope, $location, $rootScope, Assignment, $routeParams, Submission, Course, SubmissionsForCourse){
    
    $scope.toNewAssignment = function(){
        $location.path("/courses/" + $routeParams.id + "/assignments/new");
    };

    $scope.toNewAnnouncement = function(){
        $location.path("/courses/" + $routeParams.id + "/announcements/new");
    };

    $scope.toEditCourse = function(){
        $location.path("/courses/" + $routeParams.id + "/edit")
    };

    // Get all the info about the course for charts
    $scope.courseObj = Course.get({id: $routeParams.id}, function(){
        //Set all of the data recieved to variables on the scope to access later in callback and on view
        $scope.assignments = $scope.courseObj.assignments;  
        $scope.enrolled_students = $scope.courseObj.enrolled_students;
        var arr = Object.keys($scope.enrolled_students).map(function(k){ return $scope.enrolled_students[k]});

    // CHART LOGIC

        //Chart 1 Arrays (average vs max per assignment)
        $scope.assignmentTitles = []; //An array to hold all assignment titles for the Chart1 ("chart-labels" in the directive)
        $scope.averagesArr =[]; // Array to be used in Chart1 (averages of assignment submission totals)
        $scope.maxArr =[]; // Array to be used in Chart1 ()
        $scope.seriesOne = ["Average Points", "Maximum Points"]; // ("chart-series")
        $scope.chartOneData = [$scope.averagesArr, $scope.maxArr];


        //Chart2 Arrays (total submissions per assignment)

        $scope.chartTwoX = ["Total Students"]; // (chart-labels)
        $scope.chartTwoY = [[arr.length - 1 ]];//[arr.length - 1]; //(chart-data)
        // $scope.seriesTwo = ["Number of Students"]

        
        $scope.assignmentsWithSubmissionsArr = []; //An array to hold all of the assignment objects (which contain an array of submissions)
        

        $scope.assignments.forEach(function(assignment){

            $scope.assignmentTitles.push(assignment.title); //To be used for chart1 x axis
            $scope.chartTwoX.push(assignment.title); //To be used for chart2 to populate x axis

            Assignment.get({course_id: $routeParams.id, assignment_id: assignment.id}, function(a){

                $scope.assignmentsWithSubmissionsArr.push(a); //To be used to get averages

                // Initial values to then find averages
                var scoreSum = 0;
                var max = 0;
                var averageCounter = 0;
                var submissionCounter = 0;

                //Loop over array holding assignments with submissions nested
                $scope.assignmentsWithSubmissionsArr.forEach(function(assignment){
                    // Loop over the submissions in the assignment to get average
                    assignment.submissions.forEach(function(submission){
                        // Add up all the data from each submission for the assignment
                        scoreSum += submission.score;
                        max = submission.max;
                        averageCounter ++;
                        submissionCounter ++;

                        // console.log(scoreSum)
                    });

                    // console.log(scoreSum, "outside")
                    $scope.maxArr.push(max); //Push the max to the array that will be used by the chart
                    $scope.averagesArr.push( scoreSum / averageCounter ); // Push the average to the array used by the chart

                    // Reset values for next assignment
                    scoreSum = 0;
                    max = 0;
                    averageCounter = 0;

                });
                $scope.chartTwoY[0].push(submissionCounter); // Push in the amount of submissions for an assignment
                submissionCounter = 0; // Now that all of the submissions for an assignment have been counted, reset them
                $scope.assignmentsWithSubmissionsArr =[]; // Reset array so it will only do magic on the following one the next time through
            });

        });
    }); // End of Get on courses for charts logic and all of its callbacks

    //____________________________________________________________________________________________________

    // STUDENT LOGIC
    Course.get({id: $routeParams.id}, function(course){

        // Arrays to populate with student data
        $scope.students = [];
        var studentChartLabels = [],
            studentChartTotalPoints = [],
            studentChartMaxPoints = [],
            studentChartData = [],
            max = 0,
            points = 0;    

        course.enrolled_students.forEach(function(student){


            SubmissionsForCourse.query({course_id: $routeParams.id, user_id: student.id}, function(submissions){
                student.studentSubmissions = submissions
                // Find score data and assignment titles
                submissions.forEach(function(submission){


                    //Assignment titles
                        studentChartLabels.push(submission.assignment_title);
                    //Submission Data


                    studentChartMaxPoints.push(submission.max);
                    studentChartTotalPoints.push(submission.score);
                    max += submission.max;
                    points += submission.score;
                    // console.log(max)
                    // console.log(points)
                });
                student.max = max;
                student.points = points;
                max = 0;
                points = 0;

                //assign data to student
                student.studentChartLabels = studentChartLabels;
                student.studentChartSeries = ["Student's Points", "Max Points"];
                student.studentChartData = [studentChartTotalPoints, studentChartMaxPoints];
                student.courseId = $routeParams.id;
                // student.max = max;
                // student.points = points;
                // console.log(max)
                // console.log(points)
                // console.log(student)

                //push student to students
                $scope.students.push(student);
                // console.log(student)
                // console.log(studentChartLabels)


                // console.log(studentChartLabels, "before")
                studentChartLabels = [];
                // console.log(studentChartLabels, "after")
                
                studentChartTotalPoints = [];
                studentChartMaxPoints = [];
                studentChartData = [];
            })

           


        });


    });


    

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

    $scope.userDocs = "";   
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

// Private Functions 
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
app.controller("GlobalController", ["$scope", "$location", "$http","$rootScope", "User","$auth", "$log", function ($scope, $location, $http, $rootScope, User, $auth, $log){
	



//TODO handle auth:login-failure gracefully    
    //Function to check when someone is logged in and redirect them to the appopriate place
    $rootScope.$on('auth:login-success', function(ev, user) {
              // Find the user in the database to check if they're new or already have an account
       User.get({id: user.id})
               .$promise.then(function(loggedInUser){
                 //Set user on rootScope for access everywhere
                       $rootScope.user_id = loggedInUser.user.id;
                       // If the user is new...
                       if(loggedInUser.user.isNewUser) {
                               $location.path("/users/" + loggedInUser.user.id + "/additional_info");
                               //Redirect additional info page
                       } else {
                       // If not, send them to their dashboard
                           $location.path("/users/" + loggedInUser.user.id);
                               
                       }
               });
	});
    
    // Function to redirect back to login after a refresh
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!$rootScope.user_id) {
            $location.url("/login/");
        } else{
            User.get({id: $rootScope.user_id}, function(user){
                $scope.currentUser = user;
                console.log($scope.currentUser);
                console.log($scope.currentUser.user.isTeacher);
            });
        }


    });

    $scope.dashboard = function() {
      $location.path("/users/" + $rootScope.user_id);
    };

    //Logging someone out

    $scope.logout = function() {
        $auth.signOut();
        // .then(function(res) {
        //     console.log("goodbye")
        // })
        // .catch(function(res) {
        //     console.log("ldasjkd")
        // })
    };

    $rootScope.$on("auth:logout-success", function(ev, user) {
        $rootScope.user_id = null;
        $location.path("/");
    });

    $scope.toNewCourse = function () {
        $location.path("/courses/new/");
    };

    $scope.toDocumentLibrary = function () {
        $location.path("/users/" + $rootScope.user_id + "/documentLibrary");
    };

    $scope.status = {
        isopen: false
    };

    // $scope.toggled = function(open) {
    //     $log.log('Dropdown is now: ', open);
    // };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

}]);





// Link local uploads to logged in user
// Display local files in users file library
// Get google drive docs
// Display users google drive docs 
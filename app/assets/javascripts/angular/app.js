var app = angular.module("myHWApp", ["ngRoute",'ng-token-auth', 'ngFileUpload', "ngResource", 'chart.js', 'ui.tinymce', 'ui.bootstrap']);

// Config of Google Oauth
app.config(["$authProvider", function($authProvider) {
    $authProvider.configure({
      authProviderPaths: {
      google_oauth2: '/auth/google_oauth2' // <-- note that this is different than what was set with github
      },
      omniauthWindowType:'newWindow',
    });
  }]);

app.config(["$httpProvider", function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

// Angular Routes
app.config(["$routeProvider", function ($routeProvider){
	$routeProvider
	//Home
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	})
	//Login
	.when('/login/', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController'
	})
	//Additional Info
	.when('/users/:id/additional_info', {
		templateUrl: 'partials/additionalInfo.html',
		controller: 'AdditionalInfoController'
	})
	//Document Library
	.when('/users/:id/documentLibrary', {
		templateUrl: 'partials/documentLibrary.html',
		controller: 'DocumentLibraryController'
	})
	//Upload
	.when('/users/:id/upload', {
		templateUrl: 'partials/upload.html',
		controller: 'LocalUploadController'
	})
	//Dashboard (user show)
	.when('/users/:id', {
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController'
	})
	//Courses New Template
	.when('/courses/new', {
		templateUrl: 'partials/coursesNew.html',
		controller: 'CoursesNewController'
	})
	//Courses Show Template
	.when('/courses/:id', {
		templateUrl: 'partials/coursesShow.html',
		controller: 'CoursesShowController'
	})
	//Courses Edit Template
	.when('/courses/:id/edit', {
		templateUrl: 'partials/coursesEdit.html',
		controller: 'CoursesEditController'
	})
	//Assignments New Template
	.when('/courses/:course_id/assignments/new', {
		templateUrl: 'partials/assignmentsNew.html',
		controller: 'AssignmentsNewController'
	})

	//Assignments Show Template
	.when('/courses/:course_id/assignments/:assignment_id', {
		templateUrl: 'partials/assignmentsShow.html',
		controller: 'AssignmentsShowController'
	})

	//Assignments Edit Template
	.when('/courses/:course_id/assignments/:assignment_id/edit', {
		templateUrl: 'partials/assignmentsEdit.html',
		controller: 'AssignmentsEditController'
	})

	//Submission New Template
	.when('/courses/:course_id/assignments/:assignment_id/submissions/new', {
		templateUrl: 'partials/submissionsNew.html',
		controller: 'SubmissionsNewController'
	})

	//Submission Show Template
	.when('/courses/:course_id/assignments/:assignment_id/submissions/:submission_id', {
		templateUrl: 'partials/submissionsShow.html',
		controller: 'SubmissionsShowController'
	})

	//Submission Edit (for students) Template
	.when('/courses/:course_id/assignments/:assignment_id/submissions/:submission_id/edit', {
		templateUrl: 'partials/submissionsEdit.html',
		controller: 'SubmissionsEditController'
	})

	//Submission Score (for teachers) Template
	.when('/courses/:course_id/assignments/:assignment_id/submissions/:submission_id/score', {
		templateUrl: 'partials/submissionsScore.html',
		controller: 'SubmissionsScoreController'
	})

	//Command Center
	.when('/courses/:id/commandcenter', {
		templateUrl: 'partials/commandCenter.html',
		controller: 'CommandCenterController'
	})

	//Announcement New Template
	.when('/courses/:id/announcements/new', {
		templateUrl: 'partials/announcementsNew.html',
		controller: 'AnnouncementsNewController'
	})

	//Announcement New Template
	.when('/courses/:id/announcements/:announcement_id/edit', {
		templateUrl: 'partials/announcementsEdit.html',
		controller: 'AnnouncementsEditController'
	})
	.otherwise({ redirectTo: '/'});
}]);







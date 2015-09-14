var app = angular.module("myHWApp", ["ngRoute",'ng-token-auth', 'ngFileUpload', "ngResource"]);

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
	.when('/login', {
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
	//Google Drive Upload
	.when ('/users/:id/drivePicker', {
		templateUrl: 'partials/drivePicker.html',
		controler: 'GoogleDriveController'
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
	//Courses Show Template
	.when('/courses/:id/edit', {
		templateUrl: 'partials/coursesEdit.html',
		controller: 'CoursesEditController'
	})
	//Assignments New Template
	.when('/courses/:course_id/assignments/new', {
		templateUrl: 'partials/assignmentsNew.html',
		controller: 'AssignmentsNewController'
	})
	.otherwise({ redirectTo: '/'})
}]);







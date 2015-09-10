var app = angular.module("myHWApp", ["ngRoute",'ng-token-auth']);

app.config(["$authProvider", function($authProvider) {
    $authProvider.configure({
      // apiUrl: 'http://localhost:3000',
      authProviderPaths: {
      google_oauth2: '/auth/google_oauth2' // <-- note that this is different than what was set with github
      }
    });
  }]);

app.config(["$httpProvider", function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

app.config(["$routeProvider", function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController'
	})
	.otherwise({ redirectTo: '/'})
}]);
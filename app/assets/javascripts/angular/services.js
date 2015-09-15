// Resource for User model
app.service('User', ['$resource', function($resource) {
  return $resource(
    "/api/users/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}} 
  );
}]);

// Resource for Course model
app.service('Course', ['$resource', function($resource) {
  return $resource(
    "/api/courses/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}} 
  );
}]);

// Resource for Assignment model
app.service('Assignment', ['$resource', function($resource) {
  return $resource(
    "/api/courses/:course_id/assignments/:assignment_id.json",
    {course_id: "@course_id", assignment_id: "@assignment_id"},
    {update: {method: "PUT"}}
  );
}]);

// Resource for Submission model
app.service('Submission', ['$resource', function($resource) {
  return $resource(
    "/api/courses/:course_id/assignments/:assignment_id/submissions/:submission_id:id.json",
    {course_id: "@course_id", assignment_id: "@assignment_id", submission_id: "@submission_id"},
    {update: {method: "PUT"}} 
  );
}]);

// Resource for School model
app.service('School', ['$resource', function($resource) {
  return $resource(
    "/api/schools/:id.json",
    {id: "@id"}
  );
}]);

// Resource for Documents model
app.service('Document', ['$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(
    "/api/users/:user_id/documents",
    {user_id: $rootScope.user_id }
  );
}]);

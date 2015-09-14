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

// Resource for Course model
app.service('Assignment', ['$resource', function($resource) {
  return $resource(
    "/api/courses/:course_id/assignments/:assignment_id.json",
    {course_id: "@course_id", assignment_id: "@assignment_id"},
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

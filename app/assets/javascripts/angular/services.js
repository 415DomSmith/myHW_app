// Resource for User model
app.service('User', ['$resource', function($resource) {
  return $resource(
    "/api/users/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}} 
  );
}]);
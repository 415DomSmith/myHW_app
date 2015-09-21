app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

app.filter('grade', function () {
   return function (input) {
   		if(input < .60) {
   			return "F"
   		}
   		if(input < .70) {
   			return "D"
   		}
       	if(input < .80) {
   			return "C"
   		}
   		if(input < .90) {
   			return "B"
   		}
   		if(input < .100) {
   			return "A"
   		}
   		if(input >= .100) {
   			return "A"
   		}
   };
 });

// app.filter('capitalize', function() {
//   return function(input, scope) {
//     if (input)
//     input = input.toLowerCase();
//     return input.substring(0,1).toUpperCase()+input.substring(1);
//   }
// });
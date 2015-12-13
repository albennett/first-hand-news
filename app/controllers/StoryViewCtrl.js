app.controller("StoryViewCtrl", ["$scope", "$location", "$firebaseArray", "$firebaseAuth", "$routeParams",
  function($scope, $location, $firebaseArray, $firebaseAuth, $routeParams) {
console.log("hellostoryview");

var selectStoryId = $routeParams.story_id;
console.log("selectStoryId", selectStoryId);

console.log("routeparams", $routeParams);
// if (selectStoryId === )


var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId);
$scope.storiesArray = $firebaseArray(newRef);
// console.log("newref", newRef);
console.log("newref.input", newRef.input);


}]);
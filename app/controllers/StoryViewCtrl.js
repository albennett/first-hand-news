app.controller("StoryViewCtrl", ["$scope", "$location", "$firebaseArray", "$firebaseAuth", "$routeParams",
  function($scope, $location, $firebaseArray, $firebaseAuth, $routeParams) {
	
	var selectStoryId = $routeParams.story_id;
	console.log("selectStoryId", selectStoryId);
	console.log("routeparams", $routeParams);
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	$scope.logout = function(){
	  $firebaseAuth(ref).$unauth();
	  console.log("logged out");
	};
	var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId);
	$scope.storiesArray = $firebaseArray(newRef);
	console.log("newref.input", newRef.input);

}]);
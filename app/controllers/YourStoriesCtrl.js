app.controller("YourStoriesCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  	var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  	var authData = $firebaseAuth(ref).$getAuth();
  	var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories")

  	$scope.logout = function(){
	    $firebaseAuth(ref).$unauth();
	    console.log("logged out");
  	};

  	console.log("orderByChild", storyRef.orderByChild("input"));
    var query = storyRef.orderByChild("User").equalTo(authData.uid);
    console.log("query", query);
    $scope.yourStoriesArray = $firebaseArray(query);
}]);
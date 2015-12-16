app.controller("YourStoriesCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {

  	var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  	$scope.authData = $firebaseAuth(ref).$getAuth();
  	var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories");
  	console.log("$scope.authData", $scope.authData);
  	var userId = $routeParams.user_id;
  	console.log("userId", userId);

  	var refUser = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + userId)
  	$scope.refUserArray = $firebaseArray(refUser);
  	console.log("refuserobject", $scope.refUserObject);

  	// $scope.selectedUser = storageFactory.getCategoryId($routeParams.category_id);  
  	$scope.userLoggedIn = function(auth) {
    if ($scope.authData)  {
      return true;
    	}
  	};

  	$scope.logout = function(){
	    $firebaseAuth(ref).$unauth();
	    console.log("logged out");
  	};

  	console.log("orderByChild", storyRef.orderByChild("input"));
    var query = storyRef.orderByChild("User").equalTo(userId);
    console.log("query", query);
    $scope.yourStoriesArray = $firebaseArray(query);
    console.log("sjadf", $scope.yourStoriesArray);
}]);
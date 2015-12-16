app.controller("StoryViewCtrl", ["$scope", "$location", "$firebaseArray", "$firebaseAuth", "$routeParams", "$firebaseObject",
  function($scope, $location, $firebaseArray, $firebaseAuth, $routeParams, $firebaseObject) {
	
	var selectStoryId = $routeParams.story_id;
	$scope.voted = false;
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	$scope.authData = $firebaseAuth(ref).$getAuth();
	var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId);
	$scope.storiesArray = $firebaseArray(newRef);
	var ratingRef = new Firebase ("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId + "/rating");
	$scope.RateRef = $firebaseObject(ratingRef);
	var userStoryRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId + "/usersRanking")
  $scope.storiesUsersArray = $firebaseArray(userStoryRef);

	$scope.logout = function(){
	  $firebaseAuth(ref).$unauth();
	  console.log("logged out");
	};

	$scope.userLoggedIn = function(auth) {
    if ($scope.authData)  {
      return true;
    }
  };

  $scope.storiesArray.$loaded()
  .then(function(){
  	console.log("storiesarray", $scope.storiesArray);
  	 $scope.theId = $scope.storiesArray[1].$value;
  	 console.log("id", $scope.storiesArray[6].$value);

  	 $scope.Anonymous = $scope.storiesArray[2].$value;

  	console.log("theId", $scope.theId);
	  var getImage = new Firebase ("https://first-hand-accounts.firebaseio.com/users/" + $scope.theId);
	  $scope.userImage = $firebaseArray(getImage);
	  console.log("scopeimage", $scope.userImage);

  })



//if there's already an array for users voted, then change vote to true if user's current uid has been previously stored under array 
  if ($scope.storiesUsersArray) {
		$scope.storiesUsersArray.$loaded()
		.then(function() {
			$scope.storiesUsersArray.forEach(function(element) {
				if (element.$value === $scope.authData.uid) {
					$scope.voted = true;
				} else {
					$scope.voted = false;
				}
			});	
		});
	}

	$scope.storiesUsersArray.$loaded()
    .then(function() {

			$scope.incrementVote = function() {
//if user is not logged in, then 
				if ($scope.authData === null) {
					alert("Log In to vote");
				}
// if user hasn't voted, then the uid and counter gets added 
				if ($scope.voted === false){
					$scope.storiesUsersArray.$add($scope.authData.uid);
					$scope.voted = true;
					console.log("can vote");
					$scope.RateRef.$loaded()
    				.then(function() {
							$scope.RateRef.$value++;
		          $scope.RateRef.$save();
						});
						 } else {
							alert("can only vote once");
						}
				}
		});

}]);
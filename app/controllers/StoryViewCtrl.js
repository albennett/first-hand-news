app.controller("StoryViewCtrl", ["$scope", "$location", "$firebaseArray", "$firebaseAuth", "$routeParams", "$firebaseObject",
  function($scope, $location, $firebaseArray, $firebaseAuth, $routeParams, $firebaseObject) {
	
	var selectStoryId = $routeParams.story_id;
	$scope.voted = false;
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	var authData = $firebaseAuth(ref).$getAuth();
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
    if (authData)  {
      return true;
    }
  };

//if there's already an array for users voted, then change vote to true if user's current uid has been previously stored under array 
  if ($scope.storiesUsersArray) {
		$scope.storiesUsersArray.$loaded()
		.then(function() {
			$scope.storiesUsersArray.forEach(function(element) {
				if (element.$value === authData.uid) {
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
				if (authData === null) {
					alert("Log In to vote");
				}
// if user hasn't voted, then the uid and counter gets added 
				if ($scope.voted === false){
					$scope.storiesUsersArray.$add(authData.uid);
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
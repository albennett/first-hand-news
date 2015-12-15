app.controller("StoryViewCtrl", ["$scope", "$location", "$firebaseArray", "$firebaseAuth", "$routeParams", "$firebaseObject",
  function($scope, $location, $firebaseArray, $firebaseAuth, $routeParams, $firebaseObject) {
	
	var selectStoryId = $routeParams.story_id;
	console.log("selectStoryId", selectStoryId);
	console.log("routeparams", $routeParams);
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	var authData = $firebaseAuth(ref).$getAuth();
	$scope.voted = false;

	console.log("authdata", authData);

	$scope.logout = function(){
	  $firebaseAuth(ref).$unauth();
	  console.log("logged out");
	};

	$scope.userLoggedIn = function(auth) {
    if (authData)  {
      return true;
    }
  };

	var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId);

	var ratingRef = new Firebase ("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId + "/rating");

	$scope.RateRef = $firebaseObject(ratingRef);
	console.log("ratingRef", $scope.RateRef);
	$scope.storiesArray = $firebaseArray(newRef);
	console.log("storiesArray", $scope.storiesArray);

  var userStoryRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories/" + selectStoryId + "/usersRanking")
  $scope.storiesUsersArray = $firebaseArray(userStoryRef);

  console.log("storiesUsersArray", $scope.storiesUsersArray);

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
	};

	$scope.storiesUsersArray.$loaded()
    .then(function() {
			$scope.incrementVote = function() {
				if ($scope.voted === false){
					$scope.storiesUsersArray.$add(authData.uid);
					$scope.voted = true;
					console.log("can vote");
					$scope.RateRef.$value++;
          $scope.RateRef.$save();
				 } else {
					console.log("cant do it");
				}
			}
		});
     
      // });
	
}]);
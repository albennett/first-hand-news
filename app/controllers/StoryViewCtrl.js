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
    $scope.images = true;



//logs out the user
    $scope.logout = function(){
      $firebaseAuth(ref).$unauth();
      console.log("logged out");
    };
//checks to see if user is logged in
    $scope.userLoggedIn = function(auth) {
      if ($scope.authData)  {
      return true;
    }
  };

  $scope.storiesArray.$loaded()
  .then(function(){
//checks if user has uploaded an image for story.
    if ($scope.storiesArray[2].$value === ""){
    	$scope.images = false;
    }
    $scope.theId = $scope.storiesArray[1].$value;
    $scope.Anonymous = $scope.storiesArray[3].$value;
      var getImage = new Firebase ("https://first-hand-accounts.firebaseio.com/users/" + $scope.theId);
      $scope.userImage = $firebaseArray(getImage);
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
	// alert message shows to log in
      	$('.alert-it').show()
      }
// if user hasn't voted, then the uid and counter gets added
      if ($scope.voted === false){
      	$scope.storiesUsersArray.$add($scope.authData.uid);
      	$scope.voted = true;
      	$scope.RateRef.$loaded()
    	.then(function() {
    	  $scope.RateRef.$value++;
        $scope.RateRef.$save();
	     });
      } else {
      // alert("can only vote once");
        $('.alert').show()
      }
    }
  });

}]);

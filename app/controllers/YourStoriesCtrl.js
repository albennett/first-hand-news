app.controller("YourStoriesCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {

  	var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  	$scope.authData = $firebaseAuth(ref).$getAuth();
  	var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories");
  	console.log("$scope.authData", $scope.authData);
  	var userId = $routeParams.user_id;
  	var refUser = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + userId);
  	$scope.refUserArray = $firebaseArray(refUser);
  	$scope.anonymous = false;
  	$scope.signedIn = false;
//checks to see if users uid is equal to userId(users personal stories view)
  	if ($scope.authData) {
  		if ($scope.authData.uid === userId){
	  			$scope.signedIn = true;
	  	}
		}
//checks to see if user is logged in
	  	$scope.userLoggedIn = function() {
	    if ($scope.authData)  {
	      return true;
	    	}
	  	};
	  //if user is logged in, and viewing own stories, then can see own stories with Anonymous and can delete stories
	  	if ($scope.authData){
	  		$scope.canYouSeeAnonymous = function() {
	  			if ($scope.authData.uid === userId){
	  				return true;
	  			}
	  		}

		  	$scope.canYouDelete = function(){
			  	if ($scope.authData.uid === userId){
			  		return true;
			  	}
		  	}	
	  	}

  	$scope.logout = function(){
	    $firebaseAuth(ref).$unauth();
	    console.log("logged out");
  	};

//show if story with user who created it equals the userId in routeparams
    var query = storyRef.orderByChild("User").equalTo(userId);
    $scope.yourStoriesArray = $firebaseArray(query);
    
    $scope.yourStoriesArray.$loaded()
    .then(function(){

	  	$scope.yourStoriesArray.forEach(function(element){
	  		if (element.anonymous === true){
	  			$scope.anonymous = true;
	  		}
	  	});  
    })
  	

  		
}]);
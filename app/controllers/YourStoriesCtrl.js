app.controller("YourStoriesCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {

  	var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  	$scope.authData = $firebaseAuth(ref).$getAuth();
  	var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories");
  	console.log("$scope.authData", $scope.authData);
  	var userId = $routeParams.user_id;
  	console.log("userId", userId);
  	$scope.anonymous = false;
  	$scope.signedIn = false;

  	var refUser = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + userId)
  	$scope.refUserArray = $firebaseArray(refUser);
  	console.log("refuserobject", $scope.refUserObject);

  	if ($scope.authData) {
		  		if ($scope.authData.uid === userId){
			  			$scope.signedIn = true;
			  	}
	  		}

 
	  	$scope.userLoggedIn = function() {
	    if ($scope.authData)  {
	      return true;
	    	}
	  	};
	  	
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

  	console.log("orderByChild", storyRef.orderByChild("input"));
    var query = storyRef.orderByChild("User").equalTo(userId);
    console.log("query", query);
    $scope.yourStoriesArray = $firebaseArray(query);
    
    $scope.yourStoriesArray.$loaded()
    .then(function(){

    console.log("yourstoriesarrat", $scope.yourStoriesArray);
	  	$scope.yourStoriesArray.forEach(function(element){

	  		if (element.anonymous === true){
	  			$scope.anonymous = true;
	  		}
	  	});  
    })
  	

  		
}]);
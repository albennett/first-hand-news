app.controller("LoginCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
	$scope.auth = $firebaseAuth(ref);

	$scope.auth.$onAuth(function(authData) {
		$scope.authData = authData;
		if(authData !== null){
			console.log(authData.auth.uid);
		} else {
			console.log('User not currently logged in');
		}
	});

    var authData = ref.getAuth();
    console.log("authData: ", authData);
    //if no login, authenticate with github OAuth
    if (authData !== null) {
    	$location.path("/home");
    }
    
}]);
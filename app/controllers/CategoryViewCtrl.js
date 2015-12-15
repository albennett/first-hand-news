app.controller("CategoryViewCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "StorageFactory", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, storageFactory, $routeParams) {

//filter
	var selectCatId = $routeParams.category_id;
	$scope.selectedCat = storageFactory.getCategoryId($routeParams.category_id);  
	console.log("selectedCat", $scope.selectedCat);
	var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories");
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	$scope.authData = $firebaseAuth(ref).$getAuth();
	$scope.logout = function(){
      $firebaseAuth(ref).$unauth();
      console.log("logged out");
    };

    $scope.userLoggedIn = function(auth) {
    if ($scope.authData)  {
      return true;
    	}
  	};

    var query = newRef.orderByChild("Category").equalTo(selectCatId);
    $scope.storiesArray = $firebaseArray(query);

}]);
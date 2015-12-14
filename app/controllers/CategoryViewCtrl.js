app.controller("CategoryViewCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "StorageFactory", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, storageFactory, $routeParams) {

//filter
	var selectCatId = $routeParams.category_id;
	$scope.selectedCat = storageFactory.getCategoryId($routeParams.category_id);  
	console.log("selectedCat", $scope.selectedCat);
	var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories");
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	var authData = $firebaseAuth(ref).$getAuth();
	$scope.logout = function(){
      $firebaseAuth(ref).$unauth();
      console.log("logged out");
    };

    $scope.userLoggedIn = function(auth) {
    if (authData)  {
      return true;
    }
  };

    console.log("orderByChild", newRef.orderByChild("input"));
    var query = newRef.orderByChild("Category").equalTo(selectCatId);
    $scope.storiesArray = $firebaseArray(query);
	console.log("$routeParams", $routeParams.category_id);
	console.log("query", query);

}]);
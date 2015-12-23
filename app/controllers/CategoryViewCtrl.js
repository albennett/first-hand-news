app.controller("CategoryViewCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "StorageFactory", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, storageFactory, $routeParams) {

//filter
	var ref = new Firebase("https://first-hand-accounts.firebaseio.com");
	var newRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories");
	var selectCatId = $routeParams.category_id;
	$scope.selectedCat = storageFactory.getCategoryId($routeParams.category_id);  
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
//if category id in stories ref is equal to category selected (shown in route params), then place matching results in storiesArray
  var query = newRef.orderByChild("Category").equalTo(selectCatId);
  $scope.storiesArray = $firebaseArray(query);

}]);
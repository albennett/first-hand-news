app.controller("CategoryViewCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "storageFactory", "$routeParams",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, storageFactory, $routeParams) {

//filter
// var newRef = new Firebase("https://sam-pinterest.firebaseio.com/stories/");
//         $scope.filtered = $firebaseArray(newRef);
        // var query = newRef.orderByChild("category").equalTo(uid);
        // $scope.filteredArray = $firebaseArray(query);
       console.log("$routeParams", $routeParams);
      $scope.selectedCat = storageFactory.getCategoryId($routeParams.id);  
      console.log("selectedCat", selectedCat);

}]);
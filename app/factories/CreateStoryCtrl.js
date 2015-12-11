app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  $scope.categoryTitle = "";
  $scope.sendCategory; 
  var auth;
  $scope.selectedCategory="";
  var createdCategoryId;
  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var authData = $firebaseAuth(ref).$getAuth();
  $scope.test;

  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  console.log("scope.allCategories", $scope.allCategories);
  
  $scope.test = "test";
  $scope.send = function() {
    console.log("$scope.categorytitle", $scope.categoryTitle);
    $scope.allCategories.$add({
      userId: authData.uid,
      title: $scope.categoryTitle   
    }).then(function(createdcat){
      var createdCategoryId = createdcat.key();
      console.log("createdCategoryId", createdCategoryId);
    }) 
  }
  // $('#CategoryModal').modal();

  $scope.sendStory = function () {
    
  }

}]);
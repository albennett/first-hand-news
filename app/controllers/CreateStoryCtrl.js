app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var authData = $firebaseAuth(ref).$getAuth();
  console.log("authdata", authData.uid);
  $scope.selectedCategory = "";
  var createdCategoryId = "";
  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  console.log("scope.allCategories", $scope.allCategories);
  var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories")
  $scope.allStories = $firebaseArray(storyRef);
  $scope.categoryTitle = "";
  $scope.storyCreated = {};
  $('#CategoryModal').modal();

  $scope.logout = function(){
    $firebaseAuth(ref).$unauth();
    console.log("logged out");
  };

  $scope.Categories = function () {
    if ($scope.categoryTitle === "") {
      $scope.storyCreated.Category = $scope.selectedCategory.$id;
    } else {
      console.log("created", $scope.categoryTitle);
      $scope.sendCategory();
    }
  }

  $scope.sendCategory = function() {
    console.log("selectedcat", $scope.selectedCategory);
    $scope.allCategories.$add({
      userId: authData.uid,
      title: $scope.categoryTitle   
    }).then(function(createdcat){
       createdCategoryId = createdcat.key();
       $scope.storyCreated.Category = createdCategoryId;
    }) 
  }

  $scope.Stories = function () {
    $scope.storyCreated.User = authData.uid;
    $scope.storyCreated.input = $scope.storyInput;
    $scope.allStories.$add($scope.storyCreated);
  }

}]);
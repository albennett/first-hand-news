app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var authData = $firebaseAuth(ref).$getAuth();
  var auth;
  $scope.selectedCategory = "";
  var createdCategoryId;
  $('#CategoryModal').modal();
  var storyInput = "";
  $scope.sendStory;
  var createdCategoryId = "";
  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  console.log("scope.allCategories", $scope.allCategories);
  var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories")
  $scope.allStories = $firebaseArray(storyRef);
  $scope.categoryTitle = "";
  $scope.sendStory;
  $scope.storyLukeCreated = {};

  $scope.Categories = function () {
    if ($scope.categoryTitle === "") {
      $scope.storyLukeCreated.createdCategory = $scope.selectedCategory.$id;
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
       // $scope.sendStory(createdcat);
       var createdCategoryId = createdcat.key();
       $scope.storyLukeCreated.createdCategory = createdCategoryId;
    }) 
  }

  $scope.Stories = function () {
    $scope.storyLukeCreated.input = $scope.storyInput;
    $scope.allStories.$add($scope.storyLukeCreated)
  }

}]);
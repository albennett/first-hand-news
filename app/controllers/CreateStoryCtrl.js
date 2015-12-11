app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var authData = $firebaseAuth(ref).$getAuth();
  var auth;
  $scope.selectedCategory = "";
  var createdCategoryId;
  $('#CategoryModal').modal();
  var storyInput = "";

  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  console.log("scope.allCategories", $scope.allCategories);

  var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories")
  $scope.allStories = $firebaseArray(storyRef);

  $scope.sendCategory = function() {
    console.log("selectedcat", $scope.selectedCategory);
    $scope.allCategories.$add({
      userId: authData.uid,
      title: $scope.categoryTitle   
    }).then(function(createdcat){
      // if (selec)
      var createdCategoryId = createdcat.key();
      $scope.sendStory = function () {
        $scope.allStories.$add({
        // chosenCategory: $scope.selectedCategory.$id,
        createdCategory: createdCategoryId,
        input: $scope.storyInput
      }) 
    }
    }) 
  }

  $scope.sendChosenCategory = function() {
    console.log("selectedcat", $scope.selectedCategory.$id);
    $scope.sendChosenStory = function() {
      $scope.allStories.$add({
        chosenCategory: $scope.selectedCategory.$id,
        input: $scope.storyInput
      })  
    }
  }

        // chosenCategory: $scope.selectedCategory.$id,


}]);
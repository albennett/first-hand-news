app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  $scope.authData = $firebaseAuth(ref).$getAuth();
  $scope.selectedCategory = "";
  var createdCategoryId = "";
  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  console.log("scope.allCategories", $scope.allCategories);
  var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories")
  $scope.allStories = $firebaseArray(storyRef);
  $scope.categoryTitle = "";
  storyCreated = {};
  $('#CategoryModal').modal();
  $scope.storyTitle = "";
  $scope.checkedInput = false;

  $scope.logout = function(){
    $firebaseAuth(ref).$unauth();
    console.log("logged out");
  };

  $scope.userLoggedIn = function(auth) {
    if ($scope.authData)  {
      return true;
    }
  };

  $scope.Categories = function () {
    if ($scope.categoryTitle === "") {
      storyCreated.Category = $scope.selectedCategory.$id;
    } else {
      console.log("created", $scope.categoryTitle);
      $scope.sendCategory();
    }
  }

  $scope.sendCategory = function() {
    console.log("selectedcat", $scope.selectedCategory);
    $scope.allCategories.$add({
      userId: $scope.authData.uid,
      title: $scope.categoryTitle   
    }).then(function(createdcat){
       createdCategoryId = createdcat.key();
       storyCreated.Category = createdCategoryId;
    }) 
  }

var path = "#/user/" + $scope.authData.uid;
console.log("path", path);

  $scope.Stories = function () {
    storyCreated.User = $scope.authData.uid;
    storyCreated.name = $scope.authData.facebook.displayName;
    storyCreated.input = $scope.storyInput;
    storyCreated.title = $scope.storyTitle;
    storyCreated.rating = 0;
    storyCreated.anonymous = $scope.checkedInput;
    $scope.allStories.$add(storyCreated);
    $location.path("#/user/" + $scope.authData.uid);
  }

}]);
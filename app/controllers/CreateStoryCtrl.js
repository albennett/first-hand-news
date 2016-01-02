app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "Upload","$timeout",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, Upload, $timeout ) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var storyRef = new Firebase("https://first-hand-accounts.firebaseio.com/stories")
  $scope.allStories = $firebaseArray(storyRef);
  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  $scope.authData = $firebaseAuth(ref).$getAuth();
  $scope.selectedCategory = "";
  var createdCategoryId = "";
  $scope.categoryTitle = "";
  $scope.storyTitle = "";
  $scope.locationInput = "";
  var storyCreated = {};
  $scope.checkedInput = false;
  $('#CategoryModal').modal();
  storyCreated.userImages = "";
  storyCreated.Category = "";
  storyCreated.CatTitle = "";



  $scope.logout = function(){
    $firebaseAuth(ref).$unauth();
    console.log("logged out");
  };

  $scope.userLoggedIn = function(auth) {
    if ($scope.authData)  {
      return true;
    }
  };
//if user doesn't create category, then category is stored from the dropdown categories
  $scope.Categories = function () {
    if ($scope.categoryTitle === "") {
      storyCreated.Category = $scope.selectedCategory.$id;
      storyCreated.CatTitle = $scope.selectedCategory.title;
    } else { //if category is created, then run sendCategory function
      $scope.sendCategory();
    }
  }

  $scope.sendCategory = function() {
    //add the category to categories in firebase
    $scope.allCategories.$add({
      userId: $scope.authData.uid,
      title: $scope.categoryTitle   
    }).then(function(createdcat){
       createdCategoryId = createdcat.key();
       //stores the new category id in storyCreated
       storyCreated.Category = createdCategoryId;
       storyCreated.CatTitle = $scope.categoryTitle;
    }) 
  }

//stores story information when you click submit on create view
  $scope.Stories = function () {
    storyCreated.User = $scope.authData.uid;
    storyCreated.name = $scope.authData.facebook.displayName;
    storyCreated.input = $scope.storyInput;
    storyCreated.title = $scope.storyTitle;
    storyCreated.rating = 0;
    storyCreated.anonymous = $scope.checkedInput;
    storyCreated.location = $scope.locationInput;
    storyCreated.profileImage = $scope.authData.facebook.profileImageURL;
    $scope.allStories.$add(storyCreated);
    $location.path("#/user/" + $scope.authData.uid);
  }
//code for drop down
  $('.dropdown-menu').find('input').click(function (e) {
    e.stopPropagation();
  });


// testing images

$scope.AddImages = function(files) {

  Upload.base64DataUrl(files).then(function(base64Urls){
    storyCreated.userImages = base64Urls;   
    });

  };

  $(document).ready(function(){
    $('.alert-photo').click(function(){
        $('.alert').show()
    }) 
});






}]);
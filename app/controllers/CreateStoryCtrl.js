app.controller("CreateStoryCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "Upload", "$timeout",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, Upload, $timeout) {

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
  $scope.files = [];

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
    // storyCreated.images = $scope.files;
    $scope.AddPost();
    $scope.allStories.$add(storyCreated);
    $location.path("#/user/" + $scope.authData.uid);
  }

/***** Add data to firebase *****/

    // $scope.AddPost = function(files) { 

    //         // firebaseRef = 'https://first-hand-accounts.firebaseio.com/stories/-K5mT6QY8Za_OoPv3vsk'

    //         // firebaseRef.child('url').set(base64Urls)
    //         var images = Upload.base64DataUrl(files).then(function(base64Urls){
    //         $scope.images.push({
    //             base64Urls,

    //         },function(error) {
    //             if (error) {
    //                 console.log("Error:",error);
    //             } else {
    //             console.log("Post set successfully!");
    //             console.log(images);
    //             $scope.$apply();

    //         }

    //     });
    //   });
    // }

    $scope.uploadFiles = function (files) {
        $scope.files = files;
        console.log("scope.files", $scope.files);
        if (files && files.length) {
            Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    files: files
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };



}]);
app.controller("HomeCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var userExists = false;
  var authData = $firebaseAuth(ref).$getAuth();
  console.log("authdata2", authData);
  var auth;
  $scope.categoryTitle = "";
  $scope.sendCategory;
  $scope.selectedCategory="";

   //Logout, unauthorizes the user and logs them back out
    $scope.logout = function(){
      $firebaseAuth(ref).$unauth();
      console.log("logged out");
    };

  var uidRef = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + authData.uid);  //places the uidRef into a firebaseobject
  $scope.uidRefData = $firebaseObject(uidRef);
  $scope.uidRefData.$loaded() 
    .then(function(){
      console.log("scope.uidrefdata", $scope.uidRefData);
  //once uidRefData is loaded, then if there's a value, user is already saved and userExists changes to true
      if ($scope.uidRefData.$value !== null) {
        console.log('user already saved');
        userExists = true;
      } // if user is not saved, then store their uid, image and name from facebook into firebase
      if (userExists === false) {
        console.log("hello");
        uidRef.set({
          uid: authData.uid,
          image: authData.facebook.profileImageURL,
          displayName: authData.facebook.displayName
        });
      }
    });


    //firebase ref for categories
    var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
    $scope.allCategories = $firebaseArray(categoriesRef);
    console.log("scope.allCategories", $scope.allCategories);

    $scope.sendCategory = function() {
      console.log("$scope.categorytitle", $scope.categoryTitle);
      $scope.allCategories.$add({
        userId: authData.uid,
        title: $scope.categoryTitle   
      }).then(function(createdcat){
        var createdCategoryId = createdcat.key();
        console.log("createdCategoryId", createdCategoryId);
      }) 
    }
    

}]);
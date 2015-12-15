app.controller("HomeCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "StorageFactory",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, StorageFactory) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var userExists = false;
  var authData = $firebaseAuth(ref).$getAuth();
  console.log("authdata2", authData);
  var auth;
  $scope.selectedCategory="";
  var createdCategoryId;
  var eventId;
  var limitStep = 5;
  $scope.limit = limitStep;
  document.querySelector("body").addEventListener("click", function(event) {
    console.log("event", event);
    eventId = event.target.id; 
  });


  $scope.userLoggedIn = function(auth) {
    if (authData)  {
      return true;
    }
  };

  StorageFactory.setCategoryId(eventId);

   //Logout, unauthorizes the user and logs them back out
    $scope.logout = function(){
      $firebaseAuth(ref).$unauth();
      console.log("logged out");
    };

  var uidRef = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + authData.uid);  //places the uidRef into a firebaseobject
  $scope.uidRefData = $firebaseObject(uidRef);
  $scope.uidRefData.$loaded() 
    .then(function(){
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

  var storiesRef = new Firebase ("https://first-hand-accounts.firebaseio.com/stories");
  $scope.storyRef = $firebaseArray(storiesRef);
  $scope.storyRef.$loaded()
    .then(function() {
      console.log("storyRef", $scope.storyRef);
    });


  //firebase ref for categories
  var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
  $scope.allCategories = $firebaseArray(categoriesRef);
  console.log("scope.allCategories", $scope.allCategories);
  
    

}]);
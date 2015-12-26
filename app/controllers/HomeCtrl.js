app.controller("HomeCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "StorageFactory",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth, StorageFactory) {

    var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
    var userExists = false;
    $scope.authData = $firebaseAuth(ref).$getAuth();
    $scope.selectedCategory="";
    var limitStep = 5;
    $scope.limit = limitStep;
    var eventId;
    var uidRef = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + $scope.authData.uid);  //places the uidRef into a firebaseobject
    $scope.uidRefData = $firebaseObject(uidRef);
    var storiesRef = new Firebase ("https://first-hand-accounts.firebaseio.com/stories");
    $scope.storyRef = $firebaseArray(storiesRef);
    console.log("storyref", $scope.storyRef);
    var categoriesRef = new Firebase("https://first-hand-accounts.firebaseio.com/categories");
    $scope.allCategories = $firebaseArray(categoriesRef);
//adds event listener to grab id of categories
    document.querySelector("body").addEventListener("click", function(event) {
      eventId = event.target.id; 
    });
//checks to see if user is logged in, restricted views implemented if not
    $scope.userLoggedIn = function(auth) {
      if ($scope.authData)  {
        return true;
      }
    };

    StorageFactory.setCategoryId(eventId);

    $scope.redirectToHomePage= function () {
      auth.$authWithOAuthPopup('facebook');
      $location.path('#/home');
    };

   //Logout, unauthorizes the user and logs them back out
    $scope.logout = function(){
      $firebaseAuth(ref).$unauth();
      console.log("logged out");
    };

    $scope.uidRefData.$loaded() 
      .then(function(){
    //once uidRefData is loaded, then if there's a value, user is already saved and userExists changes to true
        if ($scope.uidRefData.$value !== null) {
          console.log('user already saved');
          userExists = true;
        } // if user is not saved, then store their uid, image and name from facebook into firebase
        if (userExists === false) {
          uidRef.set({
            uid: $scope.authData.uid,
            image: $scope.authData.facebook.profileImageURL,
            displayName: $scope.authData.facebook.displayName
          });
        }
      });
    
}]);
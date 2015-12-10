app.controller("HomeCtrl", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "$firebaseAuth",
  function($scope, $location, $firebaseObject, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
  var userExists = false;
  var authData = $firebaseAuth(ref).$getAuth();
  console.log("authdata2", authData);
  var auth;

   // Logout
    // $scope.logout = function(){
    //   Logout();
    //   console.log("logged out");
    // };

  var uidRef = new Firebase("https://first-hand-accounts.firebaseio.com/users/" + authData.uid);  
  $scope.uidRefData = $firebaseObject(uidRef);

  $scope.uidRefData.$loaded() 
    .then(function(){
      console.log("scope.data", $scope.uidRefData);


      if ($scope.uidRefData.$value !== null) {
        console.log('user already saved');
        userExists = true;
      }
      if (userExists === false) {
        console.log("hello");
        uidRef.set({
          uid: authData.uid,
          image: authData.facebook.profileImageURL,
          displayName: authData.facebook.displayName
        });
      }
    });

}]);
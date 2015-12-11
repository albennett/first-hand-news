var app = angular.module("First-hand-accounts", 
  ["firebase", "ngRoute", "firebase"]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/create', {
        templateUrl: 'partials/createstory.html',
        controller: 'CreateStoryCtrl'
      });
      // when('/animals', {
      //   templateUrl: 'partials/animals.html',
      //   controller: 'ProfileCtrl'
      // })
      // .otherwise({ redirectTo: '/'});
  }]);

app.run(function () {
 // Put the onAuth listener in here
 var ref = new Firebase("https://first-hand-accounts.firebaseio.com/");
   ref.onAuth(function(authData) {
     if (authData) {
       console.log("Authenticated with uid:", authData.uid);
     } else {
       console.log("Client unauthenticated.")
     }
 });
});
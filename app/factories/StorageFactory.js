app.factory("StorageFactory", ["$firebaseObject", "$firebaseArray",
  function($firebaseObject, $firebaseArray) {


      return {
        getUserId: function() {
          return userId;
        },
        setUserId: function(id) {
          userId = id;
          console.log("userID set to:", id);
        },
        getCategoryId: function(id){
          var ref = new Firebase("https://first-hand-accounts.firebaseio.com/categories/" + id);
          var specificCategory = $firebaseArray(ref);
          return specificCategory;
        },
        setCategoryId: function(id){
          categoryId = id;
          console.log("catId set to:", id);
        }
      };
  }
]);
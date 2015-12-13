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
          console.log("ref", ref);
          var specificCategory = $firebaseArray(ref);
          console.log("specificCategory", specificCategory);
          return specificCategory;
        },
        setCategoryId: function(id){
          categoryId = id;
          console.log("catId set to:", id);
        }
      };
  }
]);
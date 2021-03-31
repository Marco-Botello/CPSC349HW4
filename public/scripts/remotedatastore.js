(function(window) {
  
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

   // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCyNcpamQbc1xz9FmpPhoCG5rrH_FN_50k",
    authDomain: "coffeerun-bd31d.firebaseapp.com",
    databaseURL: "https://coffeerun-bd31d-default-rtdb.firebaseio.com",
    projectId: "coffeerun-bd31d",
    storageBucket: "coffeerun-bd31d.appspot.com",
    messagingSenderId: "265354129719",
    appId: "1:265354129719:web:06a4f5a0d96d8cca26eab2",
    measurementId: "G-MK2SWFHB3C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  function RemoteDataStore(url) {
    if(!url){throw new Error('No remote URL supplied.');}
    this.serverUrl = url;
  }

  var coffeeDatabase=firebase.firestore();

  RemoteDataStore.prototype.add = function(key, val) {
    coffeeDatabase.collection("coffeeOrders").doc(key).set(val);
  };
  RemoteDataStore.prototype.getAll = function(cb) {
    var allDocuments = coffeeDatabase.collection("coffeeOrders").get().then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {
        console.log(doc.id,"=>",doc.data());
      });
    });
    return allDocuments;
  };
  RemoteDataStore.prototype.get = function(key,cb) {
    var docs = coffeeDatabase.collection("coffeeOrders").doc(key);
    docs.get().then((doc) => {
      if(doc.exists){
        console.log("Document data:", doc.data());
      }else{
        console.log("No document by that name.");
      }
  });
}

  RemoteDataStore.prototype.remove = function(key) {
    coffeeDatabase.collection("coffeeOrders").doc(key).delete();
  };

  // RemoteDataStore.prototype.removeAll = function(key) {
  //   // delete this.data[key];
  //   // $.ajax(this.serverUrl, {type: 'DELETE'});
  //   var docs = coffeeDatabase.collection("coffeeOrders").doc(key);
  //   docs.delete().then((doc) => {
  //     if(doc.exists){
  //       console.log("Document data remove:", doc.data());
  //     }else{
  //       console.log("No document by that name.");
  //     }
  // });
  // };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);

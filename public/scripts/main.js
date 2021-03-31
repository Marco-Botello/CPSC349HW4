(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'https://coffeerun-bd31d-default-rtdb.firebaseio.com';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var Validation = App.Validation;
  
  // var myTruck = new Truck('ncc-1701', new DataStore());
  var myTruck = new Truck('ncc-1701', remoteDS);

  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  var remoteDS = new RemoteDataStore(SERVER_URL);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);

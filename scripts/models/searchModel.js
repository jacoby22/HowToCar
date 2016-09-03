(function(module) {
  var searchTool = new Object();
  searchTool.AllCars = [];
  searchTool.getAllCars = function(callback) {
    $.get('/vehicle/v2/makes').done(function(data) {
      callback(data);
      searchView.createMakeFilter();
      searchView.handleMakeFilter();
    });
  };

  searchTool.getCarMaintenance = function(callback) {
    $.get('/maintenance/actionrepository/findbymodelyearid').done(function(data) {
      callback(data);
    });
  };

  searchTool.printAllCars = function(data) {
    searchTool.AllCars.push(data);
    console.log(searchTool.AllCars);
  };
  searchTool.getAllCars(searchTool.printAllCars);
  module.searchTool = searchTool;
})(window);

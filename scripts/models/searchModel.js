(function(module) {
  var searchTool = new Object();
  searchTool.AllCars = [];
  console.log('searchModel.js');
  searchTool.getAllCars = function(callback) {
    $.get('/vehicle/v2/makes').done(function(data) {
      callback(data);
      searchView.createMakeFilter();
      searchView.handleMakeFilter();
    });
  };

  searchTool.printAllCars = function(data) {
    searchTool.AllCars.push(data);
    console.log(searchTool.AllCars);
  };
  searchTool.getAllCars(searchTool.printAllCars);
  module.searchTool = searchTool;
})(window);

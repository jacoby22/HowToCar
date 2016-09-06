(function(module) {
  var searchTool = new Object();
  searchTool.AllCars = [];

  searchTool.init = function(ctx, next) {
    next();
  };

  searchTool.getAllCars = function(callback) {
    $.get('/vehicle/v2/makes').done(function(data) {
      callback(data);
      searchView.createMakeFilter();
      searchView.handleMakeFilter();
    });
  };

  searchTool.getCarPhoto = function(callback) {
    $.get('/media/v2/' + searchView.currentCar.make.toLowerCase() + '/' + searchView.currentCar.model.toLowerCase() + '/' + searchView.currentCar.year + '/photos').done(function(data){
      callback(data);
    });
  };

  searchTool.getCarMaintenance = function(callback) {
    $.get('/maintenance/actionrepository/findbymodelyearid').done(function(data) {
      callback(data);
    });
  };

  searchTool.printAllCars = function(data) {
    searchTool.AllCars.push(data);
  };

  // $.ajax({
  //   url: 'https://app55939845.auth0.com/api/v2/users',
  //   type: 'GET',
  //   headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuTGxGRzE3RmZ1cmZiWEhkQVRMazAxVnFHUUt1S0g5TiIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NzI5NDQwODUsImp0aSI6ImUzZDRkZTBjZjNhNjlkMDQzMWQ4ZjI0NDY1N2ZjYjIwIn0.qDhaZprCScbugsJofUrDI6KajgQqYBx671wpCZT8CwU'},
  //   success: function(data) {
  //     console.log(data);
  //   }
  // });

  searchTool.getAllCars(searchTool.printAllCars);
  module.searchTool = searchTool;
})(window);

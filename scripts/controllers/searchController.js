(function(module) {
  var searchController = {};

  // searchView.handlePushToGarage();
  searchView.handleModelFilter();
  searchView.handleYearFilter();

  searchController.init = function() {
    $('.tab-content').hide();
    $('#search').show();
    // $('button#push-to-garage').hide();
  };

  module.searchController = searchController;
})(window);

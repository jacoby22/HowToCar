(function(module) {
  var searchController = {};

  searchView.handlePushToGarage();
  searchView.handleModelFilter();
  searchView.handleYearFilter();

  searchController.init = function() {
    $('.tab-content').hide();
    $('#search').show();
  };

  module.searchController = searchController;
})(window);

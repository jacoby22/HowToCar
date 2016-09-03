(function(module) {
  var searchController = {};

  searchController.init = function() {
    $('.tab-content').hide();
    $('#search').show();
  };

  module.searchController = searchController;
})(window);

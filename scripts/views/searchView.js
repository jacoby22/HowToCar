(function(module) {
  var searchView = new Object();

  searchView.createMakeFilter = function() {
    searchTool.AllCars[0].makes.map(function(make) {
      var optionTag = '<option value="' + make.name + '">' + make.name + '</option>';
      $('#make-filter').append(optionTag);
    });
  };

  searchView.handleMakeFilter = function() {
    $('#make-filter').on('change', function(e) {
      if($(this).val()) {
        var trueIndex = searchView.createModelFilter($(this).val());
      }
    });
  };

  searchView.handleModelFilter = function() {
    $('#model-filter').on('change', function(e) {
      if($(this).val()) {
        searchView.createYearFilter($(this).val());
      }
    });
  };

  searchView.createModelFilter = function(makeVal) {
    var trueIndex;
    searchTool.AllCars[0].makes.filter(function(make, indx) {
      if (make.name === makeVal) {
        trueIndex = indx;
        searchTool.AllCars[0].makes[indx].models.map(function(model) {
          var optionTag = '<option value="' + model.name + '">' + model.name + '</option>';
          $('#model-filter').append(optionTag);
        });
      }
    });
    return trueIndex;
  };

  searchView.createYearFilter = function(modelVal) {
    searchTool.AllCars[0].makes.filter(function(make, indx) {
      if (make.name === makeVal) {
        console.log(indx);
        searchTool.AllCars[0].makes[indx].models.map(function(model) {
          var optionTag = '<option value="' + model.name + '">' + model.name + '</option>';
          $('#year-filter').append(optionTag);
        });
      }
    });
  };

  $('.icon-menu-outline').on('click',function() {
    $('.main-nav ul').toggle('slow');
  });
  $(window).on('resize', function() {
    if ($(window).width() >= 641) {
      $('.main-nav ul').show();
    } else {
      $('.main-nav ul').hide();
    }
  });

  module.searchView = searchView;
})(window);

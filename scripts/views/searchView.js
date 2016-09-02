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
        searchView.handleModelFilter();
        searchView.createModelFilter($(this).val());
      }
    });
  };

  searchView.handleModelFilter = function() {
    $('#model-filter').on('change', function(e) {
      if($(this).val()) {
        searchView.handleYearFilter();
        searchView.createYearFilter($(this).val());
      }
    });
  };

  searchView.handleYearFilter = function() {
    $('#year-filter').on('change', function(e) {
      if($(this).val()) {
        var yearVal = $(this).val();
        searchTool.AllCars[0].makes[searchView.index].models[searchView.modelIndex].years.map(function(year) {
          if (year.year.toString() === yearVal.toString()) {
            searchView.searchedCar = year.id;
          }
        });
      }
      console.log(searchView.searchedCar);
    });
  };

  searchView.createModelFilter = function(makeVal) {
    searchTool.AllCars[0].makes.filter(function(make, indx) {
      if (make.name === makeVal) {
        searchView.index = indx;
        searchTool.AllCars[0].makes[indx].models.map(function(model) {
          var optionTag = '<option value="' + model.name + '">' + model.name + '</option>';
          $('#model-filter').append(optionTag);
        });
      }
    });
  };

  searchView.createYearFilter = function(modelVal) {
    searchTool.AllCars[0].makes[searchView.index].models.filter(function(model, indx) {
      if (model.name === modelVal) {
        searchView.modelIndex = indx;
        searchTool.AllCars[0].makes[searchView.index].models[searchView.modelIndex].years.map(function(year) {
          var optionTag = '<option value="' + year.year + '">' + year.year + '</option>';
          $('#year-filter').append(optionTag);
        });
      }
    });
  };

  module.searchView = searchView;
})(window);

// $('.icon-menu').on('click',function() {
//   $('.main-nav ul').toggle('slow');
//
// });
// $(window).on('resize', function() {
//   if ($(window).width() >= 680) {
//     $('.main-nav ul').show();
//   } else {
//     $('.main-nav ul').hide();
//     $('.icon-menu').show();
//   }
// });

(function(module) {
  var searchView = new Object();

  searchView.createMakeFilter = function() {
    searchTool.AllCars[0].makes.map(function(make) {
      var optionTag = '<option value="' + make.name + '">' + make.name + '</option>';
      $('#make-filter').append(optionTag).show();
    });
  };

  searchView.handleMakeFilter = function() {
    $('#make-filter').on('change', function(e) {
      $('.model-filter').remove();
      $('.year-filter').remove();
      if($(this).val()) {
        searchView.handleModelFilter();
        searchView.createModelFilter($(this).val());
      }
      $('#year-filter').val('');
      $('#model-filter').val('');
    });
  };

  searchView.handleModelFilter = function() {
    $('#model-filter').on('change', function(e) {
      if('.year-filter') {
        $('.year-filter').remove();
      };
      if($(this).val()) {
        searchView.handleYearFilter();
        searchView.createYearFilter($(this).val());
      }
      $('#year-filter').val('');
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
        searchTool.getCarMaintenance(searchView.showCarMaintenance);
      }
    });
  };

  searchView.showCarMaintenance = function(data) {
    console.log(data);
    data.actionHolder.map(function(maintenanceItem, index) {
      var listItem = '<li> <strong>Item</strong>: ' + maintenanceItem.item + ' <strong>Action:</strong> ' + maintenanceItem.action + ' <strong>Interval Mileage:</strong> ' + maintenanceItem.intervalMileage + ' <strong>Item Description:</strong> ' + maintenanceItem.itemDescription + '</li><br>';
      if (index % 10 === 0) {
        $('#maintenance').append(listItem);
      };
    });
  };

  searchView.createModelFilter = function(makeVal) {
    searchTool.AllCars[0].makes.filter(function(make, indx) {
      if (make.name === makeVal) {
        searchView.index = indx;
        searchTool.AllCars[0].makes[indx].models.map(function(model) {
          var optionTag = '<option class="model-filter" value="' + model.name + '">' + model.name + '</option>';
          $('#model-filter').append(optionTag).show();
        });
      }
    });
  };

  searchView.createYearFilter = function(modelVal) {
    searchTool.AllCars[0].makes[searchView.index].models.filter(function(model, indx) {
      if (model.name === modelVal) {
        searchView.modelIndex = indx;
        searchTool.AllCars[0].makes[searchView.index].models[searchView.modelIndex].years.map(function(year) {
          var optionTag = '<option class="year-filter" value="' + year.year + '">' + year.year + '</option>';
          $('#year-filter').append(optionTag).show();
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

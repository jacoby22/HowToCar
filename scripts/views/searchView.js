(function(module) {
  var searchView = new Object();
  searchView.currentCar = {};

  searchView.show = function() {
    $('.tab-content').hide();
    $('#search').show();
  };

  searchView.createMakeFilter = function() {
    searchTool.AllCars[0].makes.map(function(make) {
      var optionTag = '<option value="' + make.name + '">' + make.name + '</option>';
      $('#make-filter').append(optionTag).show();
      $('#push-to-garage').hide();
    });
  };

  searchView.handleMakeFilter = function() {
    $('#make-filter').on('change', function(e) {
      $('.model-filter').remove();
      $('.year-filter').remove();
      if($(this).val()) {
        searchView.currentCar.make = $(this).val();
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
        searchView.currentCar.model = $(this).val();
        searchView.handleYearFilter();
        searchView.createYearFilter($(this).val());
      }
      $('#year-filter').val('');
    });
  };

  searchView.handleYearFilter = function() {
    $('#year-filter').on('change', function(e) {
      event.stopImmediatePropagation();
      if($(this).val()) {
        searchView.currentCar.year = $(this).val();
        searchView.handlePushToGarage();
        // searchView.showCar();
        var yearVal = $(this).val();
        searchTool.AllCars[0].makes[searchView.index].models[searchView.modelIndex].years.map(function(year) {
          if (year.year.toString() === yearVal.toString()) {
            searchView.currentCar.id = year.id;
          }
        });
        if (!$('#maintenance li')) {
          searchTool.getCarMaintenance(searchView.showCarMaintenance);
        } else {
          $('.maintenance-Item').remove();
          searchTool.getCarMaintenance(searchView.showCarMaintenance);
        }
        $('#push-to-garage').show();
      }
    });
  };

  searchView.handlePushToGarage = function() {
    console.log('in');
    $('#push-to-garage').on('click', function() {
      console.log('clicked');
      garage.savedCarMaintenance = searchView.searchedCarMaintenance;
      // console.log(garage.savedCars.indexOf(searchView.currentCar));
      if (garage.savedCars.indexOf(searchView.currentCar) < 0) {
        console.log('success');
        garage.savedCars.push(searchView.currentCar);
      }
      $('#push-to-garage').hide();
    });
  };

  // var renderCar = function(carData) {
  //   var garageTemplate = Handlebars.compile($('#car-template').html());
  //
  //   return garageTemplate(carData);
  // };
  //
  // searchView.showCar = function() {
  //   var listItem = renderCar(searchView.currentCar);
  //   console.log(searchView.CurrentCar);
  //   $('#car').append(listItem);
  // };

  var render = function(carData) {
    var garageTemplate2 = Handlebars.compile($('#maintenance-template').html());

    return garageTemplate2(carData);
  };

  searchView.showCarMaintenance = function(data) {
    searchView.searchedCarMaintenance = [];
    data.actionHolder.map(function(maintenanceItem, index) {
      searchView.searchedCarMaintenance.push(maintenanceItem);
      if (index % 10 === 0) {
        var listItem = render(searchView.searchedCarMaintenance[index]);
        console.log(searchView.searchedCarMaintenance[index]);
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

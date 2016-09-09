(function(module) {
  var searchView = new Object();
  searchView.currentCar = {};
  // var array1 = [];
  // var array2 = [];

  searchView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').hide();
    $('#generalFooter').hide();
    $('#search').show();
    $('#edmundsLegal').show();
  };

  searchView.createMakeFilter = function() {
    searchTool.AllCars[0].makes.map(function(make) {
      var optionTag = '<option value="' + make.name + '">' + make.name + '</option>';
      $('#make-filter').append(optionTag).show();
      $('#push-to-garage').hide();
    });
  };

  searchView.handleMakeFilter = function() {
    $('#make-filter').on('change', function() {
      $('.model-filter').remove();
      $('.year-filter').remove();
      if($(this).val()) {
        searchView.currentCar.make = $(this).val();
        searchView.createModelFilter($(this).val());
      }
      $('#year-filter').val('');
      $('#model-filter').val('');
    });
  };

  searchView.handleModelFilter = function() {
    $('#model-filter').on('change', function() {
      if('.year-filter') {
        $('.year-filter').remove();
      };
      if($(this).val()) {
        searchView.currentCar.model = $(this).val();
        searchView.createYearFilter($(this).val());
      }
      $('#year-filter').val('');
    });
  };

  searchView.handleYearFilter = function() {
    $('#year-filter').on('change', function() {
      if($(this).val()) {
        searchView.currentCar.year = $(this).val();
        var yearVal = $(this).val();
        searchTool.AllCars[0].makes[searchView.index].models[searchView.modelIndex].years.map(function(year) {
          if (year.year.toString() === yearVal.toString()) {
            searchView.currentCar.id = year.id;
          }
        });
        if (!$('.maintenance-Item')) {
          // searchTool.getCarMaintenance(searchView.showCarMaintenance);
          searchView.showCarPhoto();
        } else {
          $('.maintenance-Item').remove();
          // searchTool.getCarMaintenance(searchView.showCarMaintenance);
          searchView.showCarPhoto();
        }
        $('.push-to-garage').show();
        console.log(searchView.currentCar);
      }
    });
  };

  searchView.addCar = function() {
    var userEmail = localStorage.getItem('currentUser');
    $.get('/addCar', {currentCar: searchView.currentCar, email: userEmail});
  };
  // searchView.handlePushToGarage = function() {
  //   var counter = 0;
  //   $('#push-to-garage').on('click', function() {
  //     if (garage.savedCars.length === 0) {
  //       array1 = [searchView.currentCar.id, searchView.currentCar.make, searchView.currentCar.model, searchView.currentCar.year, searchView.searchedCarMaintenance];
  //       garage.savedCars.push(array1);
  //     } else {
  //       array2 = [searchView.currentCar.id, searchView.currentCar.make, searchView.currentCar.model, searchView.currentCar.year, searchView.searchedCarMaintenance];
  //       garage.savedCars.forEach(function(index) {
  //         if(index[0] === searchView.currentCar.id) {
  //           counter = 1;
  //         }
  //       });
  //       if (counter === 0) {
  //         garage.savedCars.push(array2);
  //       }
  //       counter = 0;
  //     }
  //     $('#push-to-garage').hide();
  //   });
  // };

  // var renderCar = function(carData) {
  //   var garageTemplate = Handlebars.compile($('#car-template').html());
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
        var listItem = '<li class="maintenance-Item"><strong> ITEM: </strong> ' + searchView.searchedCarMaintenance[index].item + '<br><strong> ACTION: </strong> ' + searchView.searchedCarMaintenance[index].action + '<br><strong> DESCRIPTION:</strong> ' + searchView.searchedCarMaintenance[index].itemDescription + '<br><strong> INTERVAL MILEAGE: </strong> ' + searchView.searchedCarMaintenance[index].intervalMileage + '<br></li><p>';
        // console.log(searchView.searchedCarMaintenance[index]);
        $('#maintenance').append(listItem);
      };
    });
  };

  searchView.showCarPhoto = function() {
    if ($('#car-container')) {
      $('#car-container').remove();
    }
    var carPhoto = '<div id="car-container"><p>Search Results:<div id="car-photo"> <img src="http://media.ed.edmunds-media.com/audi/s7/2013/oem/2013_audi_s7_sedan_prestige_fq_oem_6_1600.jpg"></div><p id="results-text">' + searchView.currentCar.make + ' ' + searchView.currentCar.model + ' - ' + searchView.currentCar.year + '</p></div>';
    $('#search').append(carPhoto);
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

  searchView.addeventasync = function() {
    addeventatc.register.on('button-click', function(obj){
      $('#addToCalendar').show();
        // Console log example
      console.log('button-click -> ' + obj.id);
    });
  };


  module.searchView = searchView;
})(window);

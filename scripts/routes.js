page('/', loginController.init, loginView.show);
page('/garage', garageController.init, garageView.show);
page('/search', searchTool.init, searchView.show);
page('/addCar', searchView.addCar);
// page('/calendar', calendarController.init, calendarView.show);



page();

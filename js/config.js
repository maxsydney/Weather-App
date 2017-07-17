angular.module('myApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "templates/main.html",
        controller: 'weatherCtrl'
      })
      .otherwise ( {
        redirectTo: "/"
      })
  })

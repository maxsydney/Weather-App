angular.module('myApp', ['ngRoute', 'ui.bootstrap'])
  .controller('weatherCtrl', function($scope, $http, $location, $uibModal, weather){

    $scope.visibility = 'invisible'; // Hides location specific data until assigned
    $scope.table = 'table-invisible'


    // Respond to enter keypress
    $scope.enter = function (key) {
      if (key == 13) {
        $scope.getData($scope.myLocation)
      }
    };

    // Get data from the openweathermap API
    $scope.getData = function (location) {
      $scope.myLocation = "" // Clear the entry box
      url = weather.updateByCity(location); // Creates API url
      // Extract data from openweathermap API GET promise
      weather.sendRequest(url)
        .then(function(data) {
            $scope.visibility = 'visible'; // Show todays weather section
            $scope.table = 'table-visible'
            $scope.data = weather.processData(data.data)
            //$scope.today = weather.getDetails(data.data)
        });
    }

    // Get locations for location typeahead
    $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };

    // Open modal view for extra weather details
    $scope.openModal = function (today) {
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl',
        resolve: {
          day: function () {
            return today;
          }
        }
      })
    };
  });

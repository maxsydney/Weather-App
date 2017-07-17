angular.module("myApp")
  .controller('detailsCtrl', function($scope, $uibModalInstance, day) {
    $scope.day = day;

    // Close modal
    $scope.close = function() {
      $uibModalInstance.dismiss('cancel');
    }

  })  ;

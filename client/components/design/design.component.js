angular
  .module('snaplab.design')
  .component('design', {
    templateUrl: 'components/design/design.template.html',
    controller: ['$scope', '$state', function ($scope, $state) {
      $scope.navPoint = true;
      $scope.$watch(function () {
        return $state.$current.name;
      }, function (newVal) {
        if (newVal == 'design.quick') {
          $scope.navPoint = true;
        } else if (newVal == 'design.detail') {
          $scope.navPoint = false;
        }
      });
    }]
  });

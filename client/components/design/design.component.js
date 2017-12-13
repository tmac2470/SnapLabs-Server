(function () {
  angular
    .module('snaplab.design')
    .component('design', {
      templateUrl: 'components/design/design.template.html',
      controller: controller
    });

  function controller($scope, $state) {
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
  }

  controller.$inject = ['$scope', '$state'];
})();


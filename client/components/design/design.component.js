(function () {
  angular
    .module('snaplab.design')
    .component('design', {
      templateUrl: 'components/design/design.template.html',
      controller: controller
    });

  function controller($scope, $state) {
    var self = this;

    self.navPoint = true;
    $scope.$watch(function () {
      return $state.$current.name;
    }, function (newVal) {
      if (newVal == 'design.quick') {
        self.navPoint = true;
      } else if (newVal == 'design.detail') {
        self.navPoint = false;
      }
    });
  }

  controller.$inject = ['$scope', '$state'];
})();


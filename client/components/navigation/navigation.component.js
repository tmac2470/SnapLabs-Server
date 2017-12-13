(function () {
  'use strict';

  angular
    .module('snaplab.navigation')
    .component('navigation', {
      templateUrl: 'components/navigation/navigation.template.html',
      controller: controller
    });

  function controller($rootScope, auth, $scope, $state) {
    var self = this;

    if ($rootScope.isLogin) {
      self.isLogin = true;
      $rootScope.user = auth.getLoginUser();
      self.user = $rootScope.user;
    } else {
      self.isLogin = false;
    }
    $scope.$watch('$root.isLogin', function () {
      if ($rootScope.isLogin) {
        self.isLogin = true;
        $rootScope.user = auth.getLoginUser();
        self.user = $rootScope.user;
      } else {
        self.isLogin = false;
      }
    });


    self.isNavCollapsed = true;

    self.navCollapsedTrigger = function () {
      self.isNavCollapsed = !self.isNavCollapsed;
    };


    self.logout = function () {
      auth.logout();
      $rootScope.isLogin = false;
      $state.go('welcome');
    };
  }

  controller.$inject = ['$rootScope', 'auth', '$scope', '$state'];

})();

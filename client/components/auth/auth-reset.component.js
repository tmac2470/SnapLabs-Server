(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .component('authReset', {
      templateUrl: 'components/auth/auth-reset.template.html',
      controller: controller
    });

  function controller($rootScope, $http, auth, $state) {
    var self = this;

    self.resetpw = function () {
      var validJudgement = angular.isDefined(self.token) && angular.isDefined(self.password);
      if (validJudgement) {
        $http.post('auth/reset', { token: self.token, password: self.password })
          .then(
            function successCallback(response) {
              $state.go('welcome');
              $rootScope.addAlert({ type: 'success', msg: response.data.message });
            },
            function failCallback(response) {
              $rootScope.addAlert({ type: 'danger', msg: response.data.message });
            });
      } else {
        $rootScope.addAlert({ type: 'danger', msg: 'Send Reset Request Incomplete' });
      }
    };
  }
  controller.$inject = ['$rootScope', '$http', 'auth', '$state'];
})();

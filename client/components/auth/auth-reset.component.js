(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .component('authReset', {
      templateUrl: 'components/auth/auth-reset.template.html',
      controller: controller
    });

  function controller(notification, $http, auth, $state) {
    var self = this;

    self.resetpw = function () {
      var validJudgement = angular.isDefined(self.token) && angular.isDefined(self.password);
      if (validJudgement) {
        $http.post('auth/reset', { token: self.token, password: self.password })
          .then(function successCallback(response) {
            $state.go('welcome');
            notification.addAlert({ type: 'success', msg: response.data.message });
          }, function failCallback(response) {
            notification.addAlert({ type: 'danger', msg: response.data.message });
          });
      } else {
        notification.addAlert({ type: 'danger', msg: 'Send Reset Request Incomplete' });
      }
    };
  }
  controller.$inject = ['notification', '$http', 'auth', '$state'];
})();

(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .component('authForget', {
      templateUrl: 'components/auth/auth-forget.template.html',
      controller: controller
    });

  function controller(notification, $http, auth, $state) {

    var self = this;
    self.forgetpw = forgetpw;

    function forgetpw() {
      var validJudgement = angular.isDefined(self.email);
      if (validJudgement) {
        $http
          .post('auth/forget', { email: self.email })
          .then(function successCallback(response) {
            $state.go('reset');
            notification.addAlert({ type: 'success', msg: response.data.message });
          }, function failCallback(response) {
            notification.addAlert({ type: 'danger', msg: response.data.message });
          });
      } else {
        notification.addAlert({ type: 'danger', msg: 'Send Forget Request Incomplete' });
      }
    }

  }

  controller.$inject = ['notification', '$http', 'auth', '$state'];
})();

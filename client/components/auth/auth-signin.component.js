(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .component('authSignin', {
      templateUrl: 'components/auth/auth-signin.template.html',
      controller: controller
    });

  function controller(notification, $http, auth, $state) {
    var self = this;

    self.signIn = function () {
      var validJudgement = angular.isDefined(self.email) && angular.isDefined(self.password);
      if (validJudgement) {
        $http.post('auth/signin', { email: self.email, password: self.password })
          .then(function successCallback(response) {
            auth.saveToken(response.data.data.token);
            auth.checkLogin();
            notification.addAlert({ type: 'success', msg: response.data.message });
            $state.go('welcome');
          }, function failCallback(response) {
            notification.addAlert({ type: 'danger', msg: response.data.message });
          });
      } else {
        notification.addAlert({ type: 'danger', msg: 'Sign In Information Incomplete' });
      }
    };
  }

  controller.$inject = ['notification', '$http', 'auth', '$state'];

})();

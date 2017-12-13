(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .component('authSignup', {
      templateUrl: 'components/auth/auth-signup.template.html',
      controller: controller
    });

  function controller(notification, $http, $state) {
    this.signUp = function () {
      var self = this;

      if (self.password && self.password == self.repassword && self.email) {
        $http.post('auth/signup', { email: self.email, password: self.password })
          .then(function successCallback(response) {
            $state.go('signin');
            notification.addAlert({ type: 'success', msg: response.data.message });
          }, function failCallback(response) {
            notification.addAlert({ type: 'danger', msg: response.data.message });
          }
          );
      } else {
        notification.addAlert({ type: 'danger', msg: 'Sign Up Information Incorrect' });
      }
    };
  }

  controller.$inject = ['notification', '$http', '$state'];
})();

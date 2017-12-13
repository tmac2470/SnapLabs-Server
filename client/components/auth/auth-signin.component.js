(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .component('authSignin', {
      templateUrl: 'components/auth/auth-signin.template.html',
      controller: controller
    });

  function controller($rootScope, $http, auth, $state) {
    var self = this;

    self.signIn = function () {
      var validJudgement = angular.isDefined(self.email) && angular.isDefined(self.password);
      if (validJudgement) {
        $http.post('auth/signin', { email: self.email, password: self.password })
          .then(
            function successCallback(response) {
              auth.saveToken(response.data.data.token);
              $rootScope.isLogin = true;
              $rootScope.user = auth.getLoginUser();
              $rootScope.addAlert({ type: 'success', msg: response.data.message });
              $state.go('welcome');
            },
            function failCallback(response) {
              $rootScope.addAlert({ type: 'danger', msg: response.data.message });
            });
      } else {
        $rootScope.addAlert({ type: 'danger', msg: 'Sign In Information Incomplete' });
      }
    };
  }

  controller.$inject = ['$rootScope', '$http', 'auth', '$state'];

})();

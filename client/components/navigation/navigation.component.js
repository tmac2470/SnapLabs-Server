(function () {
  'use strict';

  angular
    .module('snaplab.navigation')
    .component('navigation', {
      templateUrl: 'components/navigation/navigation.template.html',
      controller: controller
    });

  function controller(auth, $state) {

    var self = this;

    self.auth = auth.store;
    self.isNavCollapsed = true;
    self.isAdmin = auth.store.user.role == 'admin';


    self.navCollapsedTrigger = function () {
      self.isNavCollapsed = !self.isNavCollapsed;
    };

    self.logout = logout;

    function logout() {
      auth.logout();
      $state.go('welcome');
    }

  }

  controller.$inject = ['auth', '$state'];

})();

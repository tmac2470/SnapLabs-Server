(function () {
  'use strict';

  angular
    .module('snaplab.notification')
    .component('notification', {
      templateUrl: 'components/notification/notification.template.html',
      controller: controller
    });

  function controller($rootScope) {
    var self = this;

    self.alerts = [
      { type: 'warning', msg: 'This website is for Test only' }
    ];

    $rootScope.addAlert = function (content) {
      self.alerts.pop();
      self.alerts.push(content);
    };

    self.closeAlert = function (index) {
      self.alerts.splice(index, 1);
    };
  }

  controller.$inject = ['$rootScope'];
})();


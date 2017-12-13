(function () {
  'use strict';

  angular
    .module('snaplab.notification')
    .component('notification', {
      templateUrl: 'components/notification/notification.template.html',
      controller: controller
    });

  function controller(notification) {

    var self = this;
    self.alerts = notification.alerts;
    self.closeAlert = closeAlert;

    function closeAlert(index) {
      notification.closeAlert(index);
    }
  }

  controller.$inject = ['notification'];
})();


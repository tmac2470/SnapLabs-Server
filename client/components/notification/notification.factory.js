(function () {
  'use strict';

  angular
    .module('snaplab.notification')
    .factory('notification', factory);

  function factory(){

    var alerts = [
      { type: 'warning', msg: 'This website is for Test only' }
    ];

    function addAlert(content) {
      alerts.pop();
      alerts.push(content);
    }

    function closeAlert(index) {
      alerts.splice(index, 1);
    }

    return {
      alerts: alerts,
      addAlert: addAlert,
      closeAlert: closeAlert
    };
  }


})();

(function () {
  'use strict';

  angular
    .module('snaplab.welcome')
    .component('welcome', {
      templateUrl: 'components/welcome/welcome.template.html',
      controller: controller
    });

  function controller(notification) {
    this.test = function(){
      notification.addAlert({ type: 'warning', msg: 'This website is for Test only' });
    };
  }

  controller.$inject = ['notification'];
})();


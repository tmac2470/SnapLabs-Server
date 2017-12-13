(function () {
  'use strict';

  angular.module('snaplab.modal')
    .controller('AlertModalInstanceCtrl', controller);

  function controller($uibModalInstance, content){
    var $ctrl = this;
    $ctrl.content = content;
    $ctrl.ok = function () {
      $uibModalInstance.dismiss();
    };
  }
})();


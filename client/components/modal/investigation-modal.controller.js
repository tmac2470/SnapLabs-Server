(function () {
  'use strict';

  angular
    .module('snaplab.modal')
    .controller('InvestigationModalInstanceCtrl', controller);

  function controller($uibModalInstance, content) {
    var $ctrl = this;
    $ctrl.content = content;
    $ctrl.ok = function () {
      $uibModalInstance.dismiss();
    };
  }
})();


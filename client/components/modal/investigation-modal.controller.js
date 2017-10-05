'use strict';

angular
  .module('snaplab.modal')
  .controller('InvestigationModalInstanceCtrl', function ($uibModalInstance, content) {
    var $ctrl = this;
    $ctrl.content = content;
    $ctrl.ok = function () {
      $uibModalInstance.dismiss();
    };
  });

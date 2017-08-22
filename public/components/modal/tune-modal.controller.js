'use strict';

angular.module('snaplab.modal').controller('TuneModalInstanceCtrl', function ($uibModalInstance) {
    var $ctrl = this;
    $ctrl.ok = function () {
        $uibModalInstance.dismiss();
    };
});

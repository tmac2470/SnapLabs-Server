'use strict';

angular.module('snaplab.modal').controller('AlertModalInstanceCtrl', function ($uibModalInstance, content) {
    var $ctrl = this;
    $ctrl.content = content;
    $ctrl.ok = function () {
        $uibModalInstance.dismiss();
    };
});

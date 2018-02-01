(function () {
  'use strict';

  angular
    .module('snaplab.modal')
    .controller('InvestigationModalInstanceCtrl', controller);

  function controller($uibModalInstance, content, auth, $http, notification, $state) {
    var $ctrl = this;
    $ctrl.content = content;
    $ctrl.ok = ok;
    $ctrl.endorse = endorse;
    $ctrl.isAdmin = auth.store.user.role == 'admin';

    function ok() {
      $uibModalInstance.dismiss();
    }

    function endorse() {
      var postCfg = {};
      postCfg.headers = auth.genHeader();

      $http.put('endorsement/' + content._id, {}, postCfg)
        .then(function successCallback(successResponse) {
          notification.addAlert({ type: 'success', msg: successResponse.data.message });
          $state.reload();
        }, function failCallback(failResponse) {
          notification.addAlert({ type: 'danger', msg: failResponse.data.message });
        });

      $uibModalInstance.dismiss();
    }
  }

  controller.$inject = ['$uibModalInstance', 'content', 'auth', '$http', 'notification', '$state'];
})();


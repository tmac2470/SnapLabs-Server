(function () {
  'use strict';

  angular
    .module('snaplab.endorse')
    .component('endorse', {
      templateUrl: 'components/endorse/endorse.template.html',
      controller: controller
    });

  function controller(notification, $http, $uibModal, auth, $state) {
    var self = this;

    var user = auth.store.user;
    self.email = user.email;
    self.name = user.name;
    self.endorsedInvestigations = [];

    self.$onInit = onInit;

    function onInit(){
      $http.get('endorsement')
        .then(function successCallback(successResponse) {
          console.log(successResponse);
          successResponse.data.data.forEach(function(item){
            self.endorsedInvestigations.push(item);
          });
        }, function failCallback(failResponse) {
          notification.addAlert({ type: 'danger', msg: failResponse.data.message });
        });
    }

    self.remove = function (item) {

      var postCfg = {};
      postCfg.headers = auth.genHeader();

      $http.delete('endorsement/' + item._id, postCfg)
        .then(function successCallback(successResponse) {
          notification.addAlert({ type: 'success', msg: successResponse.data.message });
          $state.reload();
        }, function failCallback(failResponse) {
          notification.addAlert({ type: 'danger', msg: failResponse.data.message });
        });

    };
  }

  controller.$inject = ['notification', '$http', '$uibModal', 'auth', '$state'];
})();

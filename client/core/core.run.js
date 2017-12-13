(function () {
  'use strict';

  angular
    .module('snaplab')
    .run(run);


  function run($rootScope, $transitions, auth, $uibModal) {
    $rootScope.isLogin = auth.isLoggedIn();

    function popNewAlert(content) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/modal/modal.template.html',
        controller: 'AlertModalInstanceCtrl',
        controllerAs: '$ctrl',
        size: 'sm',
        resolve: {
          content: function () {
            return content;
          }
        }
      });

      modalInstance.result
        .then(
          function closeDone() {
          },
          function dismissDone() {
            console.log('Modal dismissed at: ' + new Date());
          }
        );
    }

    // filter pre-login page transitions
    $transitions.onStart({ to: 'design.**' }, function (trans) {
      if (!$rootScope.isLogin) {
        popNewAlert('Sign In first');
        return trans.router.stateService.target('signin');
      }
    });

    $transitions.onStart({ to: 'profile.**' }, function (trans) {
      if (!$rootScope.isLogin) {
        popNewAlert('Sign In first');
        return trans.router.stateService.target('signin');
      }
    });

    $transitions.onStart({ to: 'myworks.**' }, function (trans) {
      if (!$rootScope.isLogin) {
        popNewAlert('Sign In first');
        return trans.router.stateService.target('signin');
      }
    });

    $transitions.onStart({ to: 'signin.**' }, function (trans) {
      if ($rootScope.isLogin) {
        popNewAlert('Have Sign In');
        return trans.router.stateService.target('welcome');
      }
    });
  }


  run.$inject = ['$rootScope', '$transitions', 'auth', '$uibModal'];
})();


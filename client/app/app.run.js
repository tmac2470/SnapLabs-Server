(function () {
  'use strict';

  angular
    .module('snaplab')
    .run(run);


  function run($transitions, auth, $uibModal, $location, $window) {

    auth.checkLogin();

    $window.ga('create', 'UA-113157192-1', 'auto');

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
        .then(function closeDone() {
        }, function dismissDone() {
        });
    }

    // filter pre-login page transitions
    $transitions.onStart({ to: 'design.**' }, function (trans) {
      if (!auth.store.isLogin) {
        popNewAlert('Sign In first');
        return trans.router.stateService.target('signin');
      }
    });

    $transitions.onStart({ to: 'profile.**' }, function (trans) {
      if (!auth.store.isLogin) {
        popNewAlert('Sign In first');
        return trans.router.stateService.target('signin');
      }
    });

    $transitions.onStart({ to: 'myworks.**' }, function (trans) {
      if (!auth.store.isLogin) {
        popNewAlert('Sign In first');
        return trans.router.stateService.target('signin');
      }
    });

    $transitions.onStart({ to: 'signin.**' }, function (trans) {
      if (auth.store.isLogin) {
        popNewAlert('Have Sign In');
        return trans.router.stateService.target('welcome');
      }
    });

    $transitions.onSuccess({}, function() {
      $window.ga('send', 'pageview', $location.path());
    });
  }

  run.$inject = ['$transitions', 'auth', '$uibModal', '$location', '$window'];

})();


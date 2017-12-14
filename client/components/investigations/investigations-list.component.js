(function () {
  'use strict';

  angular
    .module('snaplab.investigations')
    .component('investigationsList', {
      templateUrl: 'components/investigations/investigations-list.template.html',
      require: {
        finderCtrl: '?^investigationsFinder'
      },
      bindings: {
        initData: '<',
        isolated: '@'
      },
      controller: controller
    });

  function controller(notification, $http, auth, $state, $uibModal) {

    var self = this;
    self.$onChanges = onChanges;
    self.$onInit = onInit;
    self.pageChanged = onPageChanged;
    self.remove = remove;
    self.edit = edit;
    self.copy = copy;
    self.popDetail = popDetail;

    function onChanges(changesObj) {
      // filter change of data from search result
      if (!angular.isUndefined(changesObj.initData) && !angular.isUndefined(self.initData)) {
        var response = self.initData;
        loadList(self, response);
      }
    }

    function onInit() {
      var user = auth.store.user;
      if (self.isolated == 'true') {
        var httpCfg = {};
        httpCfg.headers = auth.genHeader();
        $http.get('experiments/user/' + user.id, httpCfg)
          .then(function (response) {
            loadList(self, response.data);
          });
      }
    }

    function loadList(self, data) {
      self.list = data.data;
      self.totalItems = data.data.length;
      self.currentPage = 1;
      self.maxSize = 5;

      self.currentList = [];
      for (var i = 0; i < 10 && i < self.totalItems; i++) {
        self.currentList.push(self.list[i]);
      }
    }

    function onPageChanged() {
      self.currentList = [];
      for (var i = (self.currentPage - 1) * 10; i < self.currentPage * 10 && i < self.totalItems; i++) {
        self.currentList.push(self.list[i]);
      }
    }

    function remove(item) {
      var httpCfg = {};
      httpCfg.headers = auth.genHeader();

      $http.delete('experiments/' + item._id, httpCfg)
        .then(function successCallback(successResponse) {
          notification.addAlert({ type: 'success', msg: successResponse.data.message });
          $state.reload();
        }, function failCallback(failResponse) {
          notification.addAlert({ type: 'danger', msg: failResponse.data.message });
        });
    }

    function edit(item) {
      $state.go('edit', { id: item._id });
    }

    function copy(item) {
      var user = auth.store.user;
      if(user.id == item.createdBy._id ) {
        popNewAlert('This is your own Investigation!');
        return;
      }
      $state.go('edit', { id: item._id });
    }

    function popDetail(item) {
      $http.get('experiments/' + item._id)
        .then(function successCallBack(response) {
          popDetailWindow(response.data);
        });
    }

    function popDetailWindow(content) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/modal/investigation-modal.template.html',
        controller: 'InvestigationModalInstanceCtrl',
        controllerAs: '$ctrl',
        size: 'lg',
        resolve: {
          content: function () {
            return content.data;
          }
        }
      });

      modalInstance.result
        .then(function closeDone() {
        }, function dismissDone() { });
    }

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
        }, function dismissDone() { });
    }
  }

  controller.$inject = ['notification', '$http', 'auth', '$state', '$uibModal'];

})();

(function () {
  'use strict';

  angular
    .module('snaplab.design')
    .component('designQuick', {
      templateUrl: 'components/design/design-quick.template.html',
      controller: controller
    });

  function controller(notification, $http, auth, $state, $uibModal, design) {

    var self = this;

    var defaultSensorTag;

    /*
    * import default config file
    */
    if ($state.params.id != '0') {
      //TODO: work in the future
    }
    else {
      defaultSensorTag = design.createDefaultSensorTag();
    }

    design.loadDraggableBlocks(self, defaultSensorTag, popNewAlert);

    /*
    * return block back to origin
    */
    self.returnBack = returnBack;
    self.tune = tune;

    setDefaultParameter();

    self.setSampleRate = setSampleRate;
    self.store = store;

    function setDefaultParameter() {
      self.expTitle = 'SensorTag Investigation';
      self.sampleInterval = 1000;
      self.sampleRateStr = 'select';
      self.allowDataStorage = false;
      self.allowVideo = false;
      self.autoStartGraphs = false;
      self.sensorTag = [];
      self.sensorTag.push(defaultSensorTag);
    }

    function tune(item) {
      popTuneWindow(item);
    }

    function setSampleRate(data, str) {
      self.sampleRateStr = str;
      self.sampleInterval = 1000 / data;
    }

    function returnBack(item) {
      var indexInQuick = self.quickDesignBlock.indexOf(item);
      self.quickDesignBlock.splice(indexInQuick, 1);
      var classification = item.class + 'Block';
      self[classification].push(item);
    }

    function view2Cfg(){
      var expCfg = {};
      expCfg.videoAllowed = self.allowVideo;
      expCfg.videoPrefix = self.expTitle + 'Video';
      expCfg.dataStorageAllowed = self.allowDataStorage;
      expCfg.dataStoragePrefix = self.expTitle + 'Data';
      expCfg.graphAutoStart = self.autoStartGraphs;
      expCfg.labTitle = self.expTitle;
      expCfg.sampleInterval = self.sampleInterval;
      expCfg.description = self.expDesc;
      expCfg.isPublished = self.isPublished || false;
      var sensorTagDict = {};
      for (var i in self.sensorTag) {
        sensorTagDict[i] = self.sensorTag[i];
      }
      expCfg.sensorTags = sensorTagDict;
      self.quickDesignBlock.forEach(function (block) {
        var parameters = block.parameters;
        parameters.forEach(function (parameter) {
          var splits = parameter.field.split('.');
          if (splits.length == 3) {
            defaultSensorTag.sensors[splits[0]][splits[1]][splits[2]] = parameter.value;
          } else if (splits.length == 2) {
            defaultSensorTag.sensors[splits[0]][splits[1]] = parameter.value;
          }
        });
      });
      return expCfg;
    }

    function store() {
      var expCfg = view2Cfg();

      var user = auth.store.user;
      expCfg.createdBy = user.id;

      var postCfg = {};
      postCfg.headers = auth.genHeader();

      if (expCfg.description && expCfg.labTitle) {
        $http.post('experiments/user/' + user.id, expCfg, postCfg)
          .then(function successCallback(successResponse) {
            $state.go('myworks');
            notification.addAlert({ type: 'success', msg: successResponse.data.message });
          }, function failCallback(failResponse) {
            notification.addAlert({ type: 'danger', msg: failResponse.data.message });
          });
      } else {
        notification.addAlert({ type: 'danger', msg: 'Experiment Info Incomplete' });
      }
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
        }, function dismissDone() {
        });
    }

    function popTuneWindow(item) {
      var templateBaseUrl = 'components/modal/';
      var templateUrl;
      switch (item.type) {
        case 'Data': templateUrl = templateBaseUrl + 'tune-modal-data.template.html'; break;
        case 'Grid': templateUrl = templateBaseUrl + 'tune-modal-grid.template.html'; break;
        case 'Graph': templateUrl = templateBaseUrl + 'tune-modal-graph.template.html'; break;
      }
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: templateUrl,
        controller: 'TuneModalInstanceCtrl',
        controllerAs: '$ctrl',
        resolve: {
          item: function () {
            return item;
          }
        }
      });

      modalInstance.result
        .then(function closeDone() {
        }, function dismissDone() {
        });
    }
  }

  controller.$inject = ['notification', '$http', 'auth', '$state', '$uibModal', 'design'];
})();

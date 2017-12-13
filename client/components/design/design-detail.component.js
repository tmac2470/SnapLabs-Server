(function () {
  'use strict';

  angular
    .module('snaplab.design')
    .component('designDetail', {
      templateUrl: 'components/design/design-detail.template.html',
      controller: controller,
      bindings: {
        noTitle: '@'
      }
    });

  function controller(notification, $http, auth, $state, design) {

    var self = this;

    var expId = $state.params.id;

    setDefaultParameter();

    self.duplicate = duplicate;
    self.store = store;

    function setDefaultParameter() {
      self.sensorTag = [];
      if (expId != '0') {
        self.saveOrUpdate = 'Update';
        $http.get('experiments/' + expId)
          .then(function successCallBack(response) {
            var wrap = response.data;
            for (var i in wrap.data.sensorTags) {
              self.sensorTag[i] = wrap.data.sensorTags[i];
            }
            self.expTitle = wrap.data.labTitle;
            self.expDesc = wrap.data.description;
            self.sampleInterval = parseInt(wrap.data.sampleInterval);
            self.allowDataStorage = wrap.data.dataStorageAllowed;
            self.allowVideo = wrap.data.videoAllowed;
            self.autoStartGraphs = wrap.data.graphAutoStart;
            self.isPublished = wrap.data.isPublished;
          });
      }
      else {
        self.saveOrUpdate = 'Save';
        var defaultSensorTag = design.createDefaultSensorTag();
        self.sensorTag.push(defaultSensorTag);
        self.expTitle = 'SensorTag Investigation';
        self.expDesc = '';
        self.sampleInterval = 1000;
        self.allowDataStorage = false;
        self.allowVideo = false;
        self.autoStartGraphs = false;
        self.isPublished = false;
      }
    }

    function duplicate(data) {
      var newSensorTag = JSON.parse(JSON.stringify(data));
      self.sensorTag.push(newSensorTag);
    }

    function transferToCfg() {
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
      return expCfg;
    }

    function store() {
      var expCfg = transferToCfg();

      var user = auth.store.user;
      expCfg.createdBy = user.id;

      var postCfg = {};
      postCfg.headers = auth.genHeader();

      if (expCfg.description && expCfg.labTitle) {
        if (self.saveOrUpdate == 'Save') {
          $http.post('experiments/user/' + user.id, expCfg, postCfg)
            .then(function successCallback(successResponse) {
              $state.go('myworks');
              notification.addAlert({ type: 'success', msg: successResponse.data.message });
            }, function failCallback(failResponse) {
              notification.addAlert({ type: 'danger', msg: failResponse.data.message });
            });
        } else if (self.saveOrUpdate == 'Update') {
          $http.put('experiments/' + expId, expCfg, postCfg)
            .then(function successCallback(successResponse) {
              $state.go('myworks');
              notification.addAlert({ type: 'success', msg: successResponse.data.message });
            }, function failCallback(failResponse) {
              notification.addAlert({ type: 'danger', msg: failResponse.data.message });
            });
        }
      } else {
        notification.addAlert({ type: 'danger', msg: 'Experiment Info Incomplete' });
      }
    }

  }

  controller.$inject = ['notification', '$http', 'auth', '$state', 'design'];
})();

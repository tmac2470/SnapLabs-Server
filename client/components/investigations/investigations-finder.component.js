(function () {
  'use strict';

  angular
    .module('snaplab.investigations')
    .component('investigationsFinder', {
      templateUrl: 'components/investigations/investigations-finder.template.html',
      controller: controller
    });

  function controller($http) {
    var self = this;
    self.dtEnd = new Date();
    self.dtStart = new Date(new Date().setDate(self.dtEnd.getDate() - 20));

    self.searchContent = '';

    self.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    self.sortType = '-lastupdated';

    self.search = function (type) {
      var searchContent = self.searchContent;
      var dtStart = self.dtStart;
      var dtEnd = self.dtEnd;
      var sortType = self.sortType;

      console.log(type + ':' + searchContent + ':'
        + dtStart + ':' + dtEnd + ':' + sortType);

      var httpCfg = {
        params: {
          afterDate: dtStart,
          beforeDate: dtEnd,
          sort: sortType,
          query: searchContent,
          fields: type
        }
      };
      $http.get('experiments', httpCfg)
        .then(function (response) {
          self.initData = response.data;
        });

    };

    self.openDatePicker = function (picker) {
      if (picker == 'start') {
        self.dtStartStatus = true;
      } else {
        self.dtEndStatus = true;
      }

    };

  }
  controller.$inject = ['$http'];
})();

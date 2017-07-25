'use strict';

angular.module('snaplab.experiments')
.component('experimentsFinder', {
    templateUrl: 'components/experiments/experiments-finder.template.html',
    controller: ['$http', function($http){
        var self =this;
        self.dtStart = new Date();
        self.dtEnd = new Date();

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

            console.log(type + ":" + searchContent + ":"
                + dtStart + ":" + dtEnd + ":" + sortType);

            $http.get('experiments')
                .then(function (response) {
                    self.initData = response;
                    console.log(self.initData);
                });

        };

        self.openDatePicker = function (picker) {
            if (picker == 'start') {
                self.dtStartStatus = true;
            } else {
                self.dtEndStatus = true;
            }

        };

    }]
});




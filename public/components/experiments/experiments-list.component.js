'use strict';

angular.module('snaplab.experiments')
.component('experimentsList', {
    templateUrl: 'components/experiments/experiments-list.template.html',
    require: {
        finderCtrl: '^experimentsFinder'
    },
    bindings:{
        initData:'<'
    },
    controller: ['$rootScope', '$http', 'auth','$state', function ($rootScope, $http, auth, $state) {

        var self = this;

        self.$onChanges = function(changesObj){

            console.log(changesObj);
            // filter change of data from search result
            if(!angular.isUndefined(changesObj.initData) && !angular.isUndefined(self.initData)){
                var response = self.initData;
                self.list = response.data;
                self.totalItems = response.data.length;
                self.currentPage = 1;
                self.maxSize = 5;

                self.currentList = [];
                for (var i = 0; i < 10 && i < self.totalItems; i++) {
                    self.currentList.push(self.list[i]);
                }
            }
        };



        self.pageChanged = function () {
            self.currentList = [];
            for (var i = (self.currentPage - 1) * 10; i < self.currentPage * 10 && i < self.totalItems; i++) {
                self.currentList.push(self.list[i]);
            }
        };

        self.edit = function(item) {
            console.log('edit');
            // $state.transitionTo('design', {item: item});
            $state.transitionTo('design', {newParam: '123'});
            console.log(item);
        }

    }]
});


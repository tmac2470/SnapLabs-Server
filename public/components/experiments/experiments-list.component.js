'use strict';

angular.module('snaplab.experiments')
.component('experimentsList', {
    templateUrl: 'components/experiments/experiments-list.template.html',
    require: {
        finderCtrl: '?^experimentsFinder'
    },
    bindings:{
        initData:'<',
        isolated:"@"
    },
    controller: ['$rootScope', '$http', 'auth','$state', function ($rootScope, $http, auth, $state) {

        var self = this;

        function loadList(self, data){
            self.list = data.data;
            self.totalItems = data.data.length;
            self.currentPage = 1;
            self.maxSize = 5;

            self.currentList = [];
            for (var i = 0; i < 10 && i < self.totalItems; i++) {
                self.currentList.push(self.list[i]);
            }
        }

        self.$onChanges = function(changesObj){

            console.log(changesObj);
            // filter change of data from search result
            if(!angular.isUndefined(changesObj.initData) && !angular.isUndefined(self.initData)){
                var response = self.initData;
                loadList(self, response);
            }
        };

        self.$onInit = function() {
            if (self.isolated == "true") {
                $http.get('experiments')
                    .then(function (response) {
                        loadList(self, response);
                    });
            } else {
                console.log("not isolated");
            }
        }


        self.pageChanged = function () {
            self.currentList = [];
            for (var i = (self.currentPage - 1) * 10; i < self.currentPage * 10 && i < self.totalItems; i++) {
                self.currentList.push(self.list[i]);
            }
        };

        self.edit = function(item) {
            console.log('edit');
            $state.go('design', {id: item._id});
            console.log(item);
        }

    }]
});


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
    controller: ['$rootScope', '$http', 'auth','$state','$uibModal', function ($rootScope, $http, auth, $state, $uibModal) {

        var self = this;
        var user = auth.getLoginUser();

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
                var httpCfg = {};
                httpCfg.headers = auth.genHeader();
                $http.get('experiments/user/' + user.id, httpCfg)
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

        self.remove = function(item) {
            console.log('remove');

            var httpCfg = {};
            httpCfg.headers = auth.genHeader();
            
            $http.delete('experiments/' + item._id, httpCfg)
                    .then(
                        function successCallback(successResponse){
                            $rootScope.addAlert({ type:'success', msg:'Remove Experiment Success' });
                            $state.reload();
                        },
                        function failCallback(failResponse){
                            $rootScope.addAlert({ type:'danger', msg:'Remove Experiment Fail' })
                        });
        }

        self.edit = function(item) {
            console.log('edit');
            $state.go('design.detail', {id: item._id});
            console.log(item);
        };

        self.copy = function() {
            popNewAlert('copy target experiment to create my own function is under development!');
        };


        self.popDetail = function(item){
            $http.get('experiments/' + item._id)
            .then(
                function successCallBack(response){
                    popDetailWindow(response);
                },
                function failCallback(response){
                    popDetailWindow(response);
                }
            );
        }

        function popDetailWindow(content) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/experiment-modal.template.html',
                controller: 'AlertModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
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
        };

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
        };

    }]
});


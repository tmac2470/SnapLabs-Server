'use strict';

angular.module('snaplab.profile')
.component('profile', {
    templateUrl:'components/profile/profile.template.html',
    controller: ['$rootScope','$http', '$uibModal', 'auth', function ($rootScope, $http, $uibModal, auth) {
        var self = this;

        var user = auth.getLoginUser();
        self.email = user.email;
        self.name = user.name;

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

        self.updateProfile = function() {

            if(angular.isUndefined(self.name)){
                popNewAlert('new name required');
                return;
            }

            var postCfg = {};
            postCfg.headers = auth.genHeader();

            $http.post('profiles/' + user.id, {name: self.name}, postCfg)
                .then(
                    function successCallback(successResponse){
                        $rootScope.addAlert({ type:'success', msg: successResponse.data.message });
                    },
                    function failCallback(failResponse){
                        $rootScope.addAlert({ type:'danger', msg: successResponse.data.message })
                    }
                );

        };

        self.updatePassword = function(){
            var postCfg = {};
            postCfg.headers = auth.genHeader();

            var validJudge = angular.isDefined(self.cPassword) && angular.isDefined(self.nPassword) && self.nPassword == self.nPassword2;
            if(!validJudge){
                popNewAlert('input has conflict');
                return;
            }

            $http.post('profiles/' + user.id + '/password', {cPassword: self.cPassword, nPassword: self.nPassword}, postCfg)
                .then(
                    function successCallback(successResponse){
                        $rootScope.addAlert({ type:'success', msg: successResponse.data.message });
                    },
                    function failCallback(failResponse){
                        $rootScope.addAlert({ type:'danger', msg: successResponse.data.message });
                    }
                );

        }
    }]
});
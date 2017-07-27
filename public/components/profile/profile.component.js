'use strict';

angular.module('snaplab.profile')
.component('profile', {
    templateUrl:'components/profile/profile.template.html',
    controller: ['$rootScope','$http', '$uibModal', 'auth', function ($rootScope, $http, $uibModal, auth) {
        var user = auth.getLoginUser();
        this.name = user.name;
        this.email = user.email;

        function popNewAlert(content) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'templates/alert.html',
                controller: 'AlertModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                resolve: {
                    content: function () {
                        return content;
                    }
                }
            });

            modalInstance.result.then(function closeDone() {
            }, function dismissDone() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        this.updateProfile = function() {

            if(!this.name){
                popNewAlert('new name required');
                return;
            }

            var postCfg = {};
            postCfg.headers = auth.genHeader(auth.getToken());

            $http.post('profiles/' + user.id, {name: this.name}, postCfg)
                .then(
                    function successCallback(successResponse){
                        $rootScope.addAlert({ type:'success', msg:'Profile Updating Succeeded(re-login to view the change)' });
                    },
                    function failCallback(failResponse){
                        $rootScope.addAlert({ type:'danger', msg:'Profile Updating Failed' })
                    }
                );

        };

        this.updatePassword = function(){
            var postCfg = {};
            postCfg.headers = auth.genHeader(auth.getToken());

            var invalidJudge = this.cPassword && this.cPassword.length >= 4 && this.nPassword && this.nPassword == this.nPassword2;
            if(!invalidJudge){
                popNewAlert('input has conflict');
                return;
            }

            $http.post('profiles/' + user.id + '/password', {cPassword: this.cPassword, nPassword: this.nPassword}, postCfg)
                .then(
                    function successCallback(successResponse){
                        $rootScope.addAlert({ type:'success', msg:'Password Updating Succeeded' });
                    },
                    function failCallback(failResponse){
                        $rootScope.addAlert({ type:'danger', msg:'Password Updating Failed' })
                    }
                );

        }
    }]
});
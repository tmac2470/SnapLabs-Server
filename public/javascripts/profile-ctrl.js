'use strict';

angular.module('snaplab').controller('ProfileCtrl', function ($scope, $rootScope, $http, $uibModal, authentication) {
    var user = authentication.getLoginUser();
    $scope.name = user.name;
    $scope.email = user.email;

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

    $scope.updateProfile = function() {

        if(!$scope.name){
            popNewAlert('new name required');
            return;
        }

        var postCfg = {};
        postCfg.headers = authentication.genHeader(authentication.getToken());

        $http.post('profiles/' + user.id, {name: $scope.name}, postCfg)
            .then(
                function successCallback(successResponse){
                    $rootScope.addAlert({ type:'success', msg:'Profile Updating Succeeded(re-login to view the change)' });
                },
                function failCallback(failResponse){
                    $rootScope.addAlert({ type:'danger', msg:'Profile Updating Failed' })
                }
            );

    };

    $scope.updatePassword = function(){
        var postCfg = {};
        postCfg.headers = authentication.genHeader(authentication.getToken());

        var invalidJudge = $scope.cPassword && $scope.cPassword.length >= 4 && $scope.nPassword && $scope.nPassword == $scope.nPassword2;
        if(!invalidJudge){
            popNewAlert('input has conflict');
            return;
        }

        $http.post('profiles/' + user.id + '/password', {cPassword: $scope.cPassword, nPassword: $scope.nPassword}, postCfg)
            .then(
                function successCallback(successResponse){
                    $rootScope.addAlert({ type:'success', msg:'Password Updating Succeeded' });
                },
                function failCallback(failResponse){
                    $rootScope.addAlert({ type:'danger', msg:'Password Updating Failed' })
                }
            );

    }
});


'use strict';

angular.module('snaplab').controller('ProfileCtrl', function ($scope, $rootScope, $http, authentication) {
    var user = authentication.getLoginUser();
    $scope.email = user.email;
    $scope.name = user.name;
    $scope.updateProfile = function() {
        var postCfg = {};
        postCfg.headers = authentication.genHeader(authentication.getToken());

        $http.post('profiles/' + user.id, {name: $scope.name}, postCfg)
            .then(
                function successCallback(successResponse){
                    $rootScope.addAlert({ type:'success', msg:'Profile Updating Succeeded' });
                },
                function failCallback(failResponse){
                    $rootScope.addAlert({ type:'danger', msg:'Profile Updating Failed' })
                }
            );

    }

    $scope.updatePassword = function(){
        var postCfg = {};
        postCfg.headers = authentication.genHeader(authentication.getToken());

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
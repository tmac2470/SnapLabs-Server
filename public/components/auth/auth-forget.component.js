'use strict';

angular.module('snaplab.auth')
.component('forget', {
    templateUrl: 'components/auth/auth-forget.template.html',
    controller: ['$rootScope', '$http', 'auth','$state', function ($rootScope, $http, auth, $state) {
        var self = this;

        self.forgetpw = function() {

            var validJudgement = angular.isDefined(self.email);
            if(validJudgement){
                $http.post('auth/forget', {email: self.email})
                    .then(
                        function successCallback(response) {
                            $state.go('reset');
                            $rootScope.addAlert({ type:'success', msg:'Fill in the token in your mail box' });
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg:'Send Forget Request Fail' });
                        });
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Send Forget Request Incomplete' });
            }
        }
    }]
});
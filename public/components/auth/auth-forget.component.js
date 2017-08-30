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
                            $rootScope.addAlert({ type:'success', msg: response.data.message });
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg: response.data.message });
                        });
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Send Forget Request Incomplete' });
            }
        }
    }]
});
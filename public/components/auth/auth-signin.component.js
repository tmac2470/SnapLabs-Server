'use strict';

angular.module('snaplab.auth')
.component('signin',{
    templateUrl: 'components/auth/auth-signin.template.html',
    controller: ['$rootScope', '$http', 'auth', function ($rootScope, $http, auth) {
        this.signIn = function() {
            var email = $scope.email;
            var password = $scope.password;

            var invalidJudgement = $scope.sign.email.$invalid || $scope.sign.password.$invalid;
            if(!invalidJudgement){
                $http.post('auth/signin', {email: email, password: password})
                    .then(
                        function successCallback(response) {
                            response.saveToken(response.data.token);
                            $rootScope.isLogin = true;
                            $rootScope.user = response.getLoginUser();
                            $rootScope.addAlert({ type:'success', msg:'Sign In Success' });
                            window.location.href = "/#!/";
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg:'Sign In Fail' });
                        })
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Sign In Information Incomplete' });
            }
        }
    }]
});
'use strict';

angular.module('snaplab.auth')
.component('reset', {
    templateUrl:'components/auth/auth-reset.template.html',
    controller: ['$rootScope', '$http', 'auth', function ($rootScope, $http, auth) {
        this.resetpw = function() {
            var token = this.token;
            var newPassword = this.password;

            var invalidJudgement = this.reset.token.$invalid || this.reset.password.$invalid;
            if(!invalidJudgement){
                $http.post('auth/reset', {token: token, password: newPassword})
                    .then(
                        function successCallback(response) {
                            // authentication.saveToken(response.data.token);
                            // $rootScope.isLogin = true;
                            // $rootScope.email = authentication.getLoginUser();
                            console.log(response);

                            if(response.data.status == 'fail'){
                                $rootScope.addAlert({ type:'success', msg:response.data.msg });
                            }else {
                                $rootScope.addAlert({ type:'danger', msg:response.data.msg });
                                // window.location.href = "/#!/";
                            }
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg:'Send Reset Request Fail' });
                        })
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Send Reset Request Incomplete' });
            }
        }
    }]
});
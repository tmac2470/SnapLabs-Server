'use strict';

angular.module('snaplab.auth')
.component('forget', {
    templateUrl: 'components/auth/auth-forget.template.html',
    controller: ['$rootScope', '$http', 'auth', function ($rootScope, $http, auth) {
        $rootScope.forgetpw = function() {
            var email = this.email;

            var invalidJudgement = this.forget.email.$invalid;
            if(!invalidJudgement){
                $http.post('auth/forget', {email: email})
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
                                window.location.href = "/#!/reset";
                            }
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg:'Send Forget Request Fail' });
                        })
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Send Forget Request Incomplete' });
            }
        }
    }]
});
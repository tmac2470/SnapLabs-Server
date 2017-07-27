'use strict';

angular.module('snaplab.auth')
.component('signup',{
    templateUrl: 'components/auth/auth-signup.template.html',
    controller: ['$rootScope', '$http', function ($rootScope, $http) {
        this.signUp = function() {
            var email = $scope.email;
            var password = $scope.password;
            var repassword = $scope.repassword;
            if(password && password == repassword && email){
                $http.post('auth/signup', {email: email, password: password})
                    .then(
                        function successCallback(response) {
                            window.location.href = "/#!/signin";
                            $rootScope.addAlert({ type:'success', msg:'Sign Up Success' });
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg:'Sign Up Fail' });
                        }
                    )
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Sign Up Information Incorrect' });
            }
        }
    }]
});
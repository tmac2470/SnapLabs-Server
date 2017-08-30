'use strict';

angular.module('snaplab.auth')
.component('signup',{
    templateUrl: 'components/auth/auth-signup.template.html',
    controller: ['$rootScope', '$http','$state', function ($rootScope, $http, $state) {
        this.signUp = function() {
            var self = this;

            if(self.password && self.password == self.repassword && self.email){
                $http.post('auth/signup', {email: self.email, password: self.password})
                    .then(
                        function successCallback(response) {
                            $state.go('signin');
                            $rootScope.addAlert({ type:'success', msg: response.data.message });
                        },
                        function failCallback(response) {
                            $rootScope.addAlert({ type:'danger', msg: response.data.message });
                        }
                    )
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Sign Up Information Incorrect' });
            }
        }
    }]
});
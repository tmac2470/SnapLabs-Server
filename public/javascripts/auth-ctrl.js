angular.module('snaplab').controller('SignUpCtrl', function ($scope, $rootScope, $http) {
    $scope.signUp = function() {
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
})

angular.module('snaplab').controller('SignInCtrl', function ($scope, $rootScope, $http, authentication) {
    $scope.signIn = function() {
        var email = $scope.email;
        var password = $scope.password;

        var invalidJudgement = $scope.sign.email.$invalid || $scope.sign.password.$invalid;
        if(!invalidJudgement){
            $http.post('auth/signin', {email: email, password: password})
                .then(
                    function successCallback(response) {
                        authentication.saveToken(response.data.token);
                        $rootScope.isLogin = true;
                        $rootScope.email = authentication.getLoginUser();
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
})

angular.module('snaplab').controller('ForgetCtrl', function ($scope, $rootScope, $http, authentication) {
    $scope.forgetpw = function() {
        var email = $scope.email;

        var invalidJudgement = $scope.forget.email.$invalid;
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
})

angular.module('snaplab').controller('ResetCtrl', function ($scope, $rootScope, $http, authentication) {
    $scope.resetpw = function() {
        var token = $scope.token;
        var newPassword = $scope.password;

        var invalidJudgement = $scope.reset.token.$invalid || $scope.reset.password.$invalid;
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
})

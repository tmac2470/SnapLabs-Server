/**
 * Created by MushrChun on 16/5/17.
 */
angular.module('snaplab', [ 'ui.bootstrap','ui.router', 'ui.toggle', 'ui.sortable']);

angular.module('snaplab').config(function($stateProvider, $urlRouterProvider) {
    var mainState = {
        name: 'main',
        url: '/main',
        templateUrl: 'templates/main.html'
    };

    var experimentState = {
        name: 'experiments',
        url: '/experiments',
        templateUrl: 'templates/experiments.html'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: 'templates/about.html'
    };

    var designState = {
        name: 'design',
        url: '/design',
        templateUrl: 'templates/design.html'
    };

    var downloadState = {
        name: 'download',
        url: '/download',
        templateUrl: 'templates/download.html'
    };

    var signinState = {
        name: 'signin',
        url: '/signin',
        templateUrl: 'templates/signin.html'
    };

    var signupState = {
        name: 'signup',
        url: '/signup',
        templateUrl: 'templates/signup.html'
    };

    var forgetState = {
        name: 'forget',
        url: '/forget',
        templateUrl: 'templates/forget.html'
    };

    var resetState = {
        name: 'reset',
        url: '/reset',
        templateUrl: 'templates/reset.html'
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('zone', {
        url: '/',
        templateUrl: 'templates/main.html',
    });
    $stateProvider.state(mainState);
    $stateProvider.state(experimentState);
    $stateProvider.state(aboutState);
    $stateProvider.state(designState);
    $stateProvider.state(downloadState);
    $stateProvider.state(signinState);
    $stateProvider.state(signupState);
    $stateProvider.state(forgetState);
    $stateProvider.state(resetState);
});

angular.module('snaplab').run(function($rootScope, $transitions, authentication){
    $rootScope.isLogin = authentication.isLoggedIn(authentication.getToken());
    if($rootScope.isLogin){
        $rootScope.email = authentication.getLoginUser();
    }
    $transitions.onStart({ to: 'design.**' }, function(trans) {

        if (!$rootScope.isLogin) {
            return trans.router.stateService.target('signin');
        }
    });
});


angular.module('snaplab').controller('NavCtrl', function ($scope, $rootScope, authentication) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
    $scope.logout = function(){
        authentication.logout();
        $rootScope.isLogin = false;
    }
});

angular.module('snaplab').controller('NotificationCtrl', function ($scope, $rootScope) {
    $scope.alerts = [
        { type: 'warning', msg: 'This website is for Test only' }
    ];

    $rootScope.addAlert = function(content) {
        $scope.alerts.push(content);
    };

    $rootScope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

angular.module('snaplab').controller('MainCarouselCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [
        {
            image: '/images/asell-schools-button.jpg',
            text: 'asell-schools-button',
            id: 0
        },
        {
            image: '/images/asell-uni-button.jpg',
            text: 'asell-uni-button',
            id: 1
        }
    ];
})


angular.module('snaplab').service('authentication', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {

    var payload;

    var isLoggedIn = function(token) {

        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var getLoginUser = function() {
        console.log(payload);
        return payload.email;
    }

    var genHeader = function(token) {
        return {Authorization: 'Bearer '+ token};
    }

    var saveToken = function (token) {
        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
        }
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['mean-token'];
    };

    var logout = function () {
        $window.localStorage.removeItem('mean-token');
        $rootScope.addAlert({ type:'success', msg:'Logout Success' });
        window.location.href = "/#!/";
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        isLoggedIn: isLoggedIn,
        getLoginUser: getLoginUser,
        genHeader: genHeader
    };
}]);



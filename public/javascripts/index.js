'use strict';

angular.module('snaplab', [ 'ui.bootstrap','ui.router', 'ui.toggle', 'ui.sortable', 'snaplab.experiments']);


angular.module('snaplab').config(function($stateProvider, $urlRouterProvider) {
    var mainState = {
        name: 'main',
        url: '/main',
        templateUrl: 'templates/main.html'
    };
    $stateProvider.state(mainState);

    var experimentState = {
        name: 'experiments',
        url: '/experiments',
        templateUrl: 'templates/experiments.html'
    };
    $stateProvider.state(experimentState);

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: 'templates/about.html'
    };
    $stateProvider.state(aboutState);

    var designState = {
        name: 'design',
        url: '/design',
        templateUrl: 'templates/design.html'
    };
    $stateProvider.state(designState);

    var downloadState = {
        name: 'download',
        url: '/download',
        templateUrl: 'templates/download.html'
    };
    $stateProvider.state(downloadState);

    var signinState = {
        name: 'signin',
        url: '/signin',
        templateUrl: 'templates/signin.html'
    };
    $stateProvider.state(signinState);

    var signupState = {
        name: 'signup',
        url: '/signup',
        templateUrl: 'templates/signup.html'
    };
    $stateProvider.state(signupState);

    var forgetState = {
        name: 'forget',
        url: '/forget',
        templateUrl: 'templates/forget.html'
    };
    $stateProvider.state(forgetState);

    var resetState = {
        name: 'reset',
        url: '/reset',
        templateUrl: 'templates/reset.html'
    };
    $stateProvider.state(resetState);

    var profileState = {
        name: 'profile',
        url: '/profile',
        templateUrl: 'templates/profile.html'
    };
    $stateProvider.state(profileState);

    var myworksState = {
        name: 'myworks',
        url: '/myworks',
        templateUrl: 'templates/myworks.html'
    };
    $stateProvider.state(myworksState);

    $urlRouterProvider.otherwise('/main');
});


angular.module('snaplab').run(function($rootScope, $transitions, authentication){
    $rootScope.isLogin = authentication.isLoggedIn(authentication.getToken());
    if($rootScope.isLogin){
        $rootScope.user = authentication.getLoginUser();
    }

// filter pre-login page transitions
    $transitions.onStart({ to: 'design.**' }, function(trans) {
        if (!$rootScope.isLogin) {
            return trans.router.stateService.target('signin');
        }
    });

    $transitions.onStart({ to: 'profile.**' }, function(trans) {
        if (!$rootScope.isLogin) {
            return trans.router.stateService.target('signin');
        }
    });

    $transitions.onStart({ to: 'mywork.**' }, function(trans) {
        if (!$rootScope.isLogin) {
            return trans.router.stateService.target('signin');
        }
    });

    $transitions.onStart({ to: 'signin.**' }, function(trans) {
        if ($rootScope.isLogin) {
            return trans.router.stateService.target('about');
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
        $scope.alerts.pop();
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
});


angular.module('snaplab').controller('AlertModalInstanceCtrl', function ($uibModalInstance, content) {
    var $ctrl = this;

    $ctrl.content = content;
    $ctrl.ok = function () {
        $uibModalInstance.dismiss();
    };
});

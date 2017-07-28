'use strict';

angular.module('snaplab').run(function($rootScope, $transitions, auth){
    // $rootScope.isLogin = auth.isLoggedIn();
    // if($rootScope.isLogin){
    //     $rootScope.user = auth.getLoginUser();
    // }


// filter pre-login page transitions
//     $transitions.onStart({ to: 'design.**' }, function(trans) {
//         if (!$rootScope.isLogin) {
//             return trans.router.stateService.target('signin');
//         }
//     });
//
//     $transitions.onStart({ to: 'profile.**' }, function(trans) {
//         if (!$rootScope.isLogin) {
//             return trans.router.stateService.target('signin');
//         }
//     });
//
//     $transitions.onStart({ to: 'mywork.**' }, function(trans) {
//         if (!$rootScope.isLogin) {
//             return trans.router.stateService.target('signin');
//         }
//     });
//
//     $transitions.onStart({ to: 'signin.**' }, function(trans) {
//         if ($rootScope.isLogin) {
//             return trans.router.stateService.target('about');
//         }
//     });

});
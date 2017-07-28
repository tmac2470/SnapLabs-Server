'use strict';

angular.module('snaplab.navigation')
.component('navigation', {
    templateUrl:'components/navigation/navigation.template.html',
    controller: ['$rootScope', 'auth', function ($rootScope, auth) {
        var self = this;

        self.isNavCollapsed = true;

        $rootScope.isLoggedIn = auth.isLoggedIn();
        self.isLogin = $rootScope.isLoggedIn;

        if(self.isLogin){
            self.user = auth.getLoginUser();
        }

        self.navCollapsedTrigger = function(){
            self.isNavCollapsed = !self.isNavCollapsed;
        };


        self.logout = function(){
            auth.logout();
            self.isLogin = false;
        }
    }]
});
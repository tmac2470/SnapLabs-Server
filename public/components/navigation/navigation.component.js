'use strict';

angular.module('snaplab.navigation')
.component('navigation', {
    templateUrl:'components/navigation/navigation.template.html',
    controller: ['$rootScope', 'auth', function ($rootScope, auth) {
        this.isNavCollapsed = true;
        this.isCollapsed = false;
        this.isCollapsedHorizontal = false;
        console.log(auth.getLoginUser());
        this.logout = function(){
            auth.logout();
            this.isLogin = false;
        }
    }]
});
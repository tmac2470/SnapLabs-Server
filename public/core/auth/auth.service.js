'use strict';

angular.module('snaplab.core.auth').service('auth', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {

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
        var user = {};
        user.email = payload.email;
        user.name = payload.name;
        user.id = payload._id;
        return user;
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



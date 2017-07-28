'use strict';

angular.module('snaplab.core.auth').service('auth', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {

    var payload;
    var token;

    var isLoggedIn = function() {

        if(!token){
            getToken();
        }

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

    var genHeader = function() {
        if(angular.isUndefined(token)){
            getToken();
        }
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
        token = $window.localStorage['mean-token'];
        return token;
    };

    var logout = function () {
        $window.localStorage.removeItem('mean-token');
        $rootScope.addAlert({ type:'success', msg:'Logout Success' });
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



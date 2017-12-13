(function () {
  'use strict';

  angular
    .module('snaplab.core.auth')
    .factory('auth', auth);

  function auth($http, $window, notification) {

    var payload;
    var token;
    var store = {
      isLogin: false,
      user: {},
    };
    var tokenName = 'snaplabs-token';

    function checkLogin() {

      if(store.isLogin === true){
        return;
      }

      if (!token) {
        getToken();
      }

      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        store.isLogin = payload.exp > Date.now() / 1000;
        parseLoginUser();
      } else {
        store.isLogin = false;
      }
    }

    function parseLoginUser() {
      store.user.email = payload.email;
      store.user.name = payload.name;
      store.user.id = payload._id;
    }

    function genHeader() {
      if (angular.isUndefined(token)) {
        getToken();
      }
      return { Authorization: 'Bearer ' + token };
    }

    function saveToken(token) {
      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
      }
      $window.localStorage[tokenName] = token;
    }

    function getToken() {
      token = $window.localStorage[tokenName];
      return token;
    }

    function logout() {
      $window.localStorage.removeItem(tokenName);
      notification.addAlert({ type: 'success', msg: 'Logout Success' });
      store.isLogin = false;
    }

    return {
      saveToken: saveToken,
      getToken: getToken,
      logout: logout,
      checkLogin: checkLogin,
      genHeader: genHeader,
      store: store
    };
  }

  auth.$inject = ['$http', '$window', 'notification'];
})();





(function () {
  'use strict';

  angular
    .module('snaplab.auth')
    .factory('auth', factory);

  function factory($http, $window, notification) {

    var payload;
    var token;
    var store = {
      isLogin: false,
      user: {},
    };
    var tokenName = 'snaplabs-token';

    function checkLogin() {

      getToken();

      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        parseLoginUser();

        store.isLogin = payload.exp > Date.now() / 1000;
      } else {
        store.isLogin = false;
      }
    }

    function parseLoginUser() {
      store.user.email = payload.email;
      store.user.name = payload.name;
      store.user.role = payload.role;
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

  factory.$inject = ['$http', '$window', 'notification'];
})();





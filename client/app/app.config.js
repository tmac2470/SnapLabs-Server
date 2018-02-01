(function () {
  'use strict';

  angular
    .module('snaplab')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    var states = [
      {
        name: 'welcome',
        url: '/welcome',
        component: 'welcome'
      },
      {
        name: 'investigations',
        url: '/investigations',
        component: 'investigationsFinder'
      },
      {
        name: 'design',
        url: '/design',
        component: 'design'
      },
      {
        name: 'design.quick',
        url: '/quick/:id',
        component: 'designQuick'
      },
      {
        name: 'design.detail',
        url: '/detail/:id',
        component: 'designDetail'
      },
      {
        name: 'download',
        url: '/download',
        component: 'download'
      },
      {
        name: 'signin',
        url: '/signin',
        component: 'authSignin'
      },
      {
        name: 'signup',
        url: '/signup',
        component: 'authSignup'
      },
      {
        name: 'forget',
        url: '/forget',
        component: 'authForget'
      },
      {
        name: 'reset',
        url: '/reset',
        component: 'authReset'
      },
      {
        name: 'profile',
        url: '/profile',
        component: 'profile'
      },
      {
        name: 'myworks',
        url: '/myworks',
        component: 'myworks'
      },
      {
        name: 'myreviews',
        url: '/reviews',
        component: 'myreviews'
      },
      {
        name: 'edit',
        url: '/edit/:id',
        component: 'myworksEdit'
      },
      {
        name: 'endorse',
        url: '/endorse',
        component: 'endorse'
      }
    ];

    states.forEach(function (state) {
      $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/welcome');
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
})();

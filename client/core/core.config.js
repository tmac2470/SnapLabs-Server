'use strict';

angular
  .module('snaplab')
  .config(function ($stateProvider, $urlRouterProvider) {
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
        name: 'about',
        url: '/about',
        component: 'about'
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
        name: 'edit',
        url: '/edit/:id',
        component: 'myworksEdit'
      }
    ];

    states.forEach(function (state) {
      $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/welcome');
  });
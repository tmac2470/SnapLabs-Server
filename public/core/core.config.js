'use strict';

angular.module('snaplab').config(function($stateProvider, $urlRouterProvider) {
    var states = [
        {
            name: 'welcome',
            url: '/welcome',
            templateUrl: 'page/welcome.html'
        },
        {
            name: 'experiments',
            url: '/experiments',
            component: 'experimentsFinder'
        },
        {
            name: 'about',
            url: '/about',
            templateUrl: 'page/about.html'
        },
        {
            name: 'design',
            url: '/design/:id',
            component: 'design'
        },
        {
            name: 'download',
            url: '/download',
            templateUrl: 'page/download.html'
        },
        {
            name: 'signin',
            url: '/signin',
            component: 'signin'
        },
        {
            name: 'signup',
            url: '/signup',
            component: 'signup'
        },
        {
            name: 'forget',
            url: '/forget',
            component: 'forget'
        },
        {
            name: 'reset',
            url: '/reset',
            component: 'reset'
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
        }
    ];

    states.forEach(function(state){
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/welcome');
});
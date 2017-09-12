'use strict';

angular.module('snaplab').config(function($stateProvider, $urlRouterProvider) {
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
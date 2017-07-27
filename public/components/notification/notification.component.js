'use strict';

angular.module('snaplab.notification')
.component('notification', {
    templateUrl: 'components/notification/notification.template.html',
    controller: ['$rootScope', function ($rootScope) {
        this.alerts = [
            { type: 'warning', msg: 'This website is for Test only' }
        ];

        this.addAlert = function(content) {
            this.alerts.pop();
            this.alerts.push(content);
        };

        this.closeAlert = function(index) {
            this.alerts.splice(index, 1);
        };
    }]
});
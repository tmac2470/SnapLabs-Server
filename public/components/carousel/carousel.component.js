'use strict';

angular.module('snaplab.carousel')
.component('carousel', {
    templateUrl: 'components/carousel/carousel.template.html',
    controller: function () {
        var self = this;

        self.myInterval = 5000;
        self.noWrapSlides = false;
        self.active = 0;
        self.slides = [
            {
                image: '/images/asell-schools-button.jpg',
                text: 'asell-schools-button',
                id: 0
            },
            {
                image: '/images/asell-uni-button.jpg',
                text: 'asell-uni-button',
                id: 1
            }
        ];
    }
});
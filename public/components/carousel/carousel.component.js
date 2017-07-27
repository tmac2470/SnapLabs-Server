'use strict';

angular.module('snaplab.carousel')
.component('carousel', {
    templateUrl: 'components/carousel/carousel.template.html',
    controller: [function () {
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.active = 0;
        this.slides = [
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
    }]
});
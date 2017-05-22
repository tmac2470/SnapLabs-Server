/**
 * Created by MushrChun on 16/5/17.
 */
angular.module('snaplab', [ 'ui.bootstrap']);

angular.module('snaplab').controller('NavCtrl', function ($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
});

angular.module('snaplab').controller('NotificationCtrl', function ($scope) {
    $scope.alerts = [
        { type: 'warning', msg: 'This website is for Test only' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

angular.module('snaplab').controller('MainCarouselCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [
        {
            image: '/images/asell-schools-button.jpg',
            text: 'asell-schools-button',
            id: 0
        },
        {
            image: '/images/asell-uni-button.jpg',
            text: 'asell-uni-button',
            id: 1
        },
        {
            image: '/images/usyd.png',
            text: 'usyd',
            id: 2
        },
        {
            image: '/images/altc.jpg',
            text: 'altc',
            id: 3
        }
    ];
})

angular.module('snaplab').controller('UploadedListCtrl', function ($scope, $http) {
    $http.get('experiment')
        .then(function(response) {
            $scope.list = response.data;
            $scope.totalItems = response.data.length;
            $scope.currentPage = 1;
            $scope.maxSize = 5;
        });




    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

})

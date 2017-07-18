'use strict';

angular.module('snaplab').controller('ExpListCtrl', function ($scope, $rootScope, $http, authentication) {

    $scope.dtStart = new Date();
    $scope.dtEnd = new Date();

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.sortType = 'CreatedDateDescend'

    $scope.search = function (type){
        var searchContent = $scope.searchContent;
        var dtStart = $scope.dtStart;
        var dtEnd = $scope.dtEnd;
        var sortType = $scope.sortType;

        console.log(type + ":" +searchContent + ":"
        + dtStart + ":" + dtEnd + ":" + sortType);
    }

    $scope.openDatePicker = function(picker){
        if(picker=='start'){
            $scope.dtStartStatus = true;
        }else{
            $scope.dtEndStatus = true;
        }

    }

    $http.get('experiments')
        .then(function(response) {
            $scope.list = response.data;
            $scope.totalItems = response.data.length;
            $scope.currentPage = 1;
            $scope.maxSize = 5;

            $scope.currentList = [];
            for(var i = 0; i < 10 && i<$scope.totalItems;i++){
                $scope.currentList.push($scope.list[i]);
            }
        });

    // if user login, request experiments belonged to him/her
    if($rootScope.isLogin){
        var user = $rootScope.user;
        var getOpt = {};
        getOpt.headers = authentication.genHeader(authentication.getToken());

        $http.get('experiments/' + user.id, getOpt)
            .then(
                function successCallback(response) {
                    $scope.pList = response.data;
                    $scope.pTotalItems = response.data.length;
                    $scope.pCurrentPage = 1;
                    $scope.pMaxSize = 5;

                    $scope.pCurrentList = [];
                    for(var i = 0; i < 10 && i<$scope.pTotalItems;i++){
                        $scope.pCurrentList.push($scope.list[i]);
                    }
                },
                function failCallback(response) {

            });
    }

    $scope.pageChanged = function() {
        $scope.currentList = [];
        for(var i = ($scope.currentPage-1)*10; i < $scope.currentPage*10 && i<$scope.totalItems; i++){
            $scope.currentList.push($scope.list[i]);
        }
    };

    $scope.pPageChanged = function() {
        $scope.currentList = [];
        for(var i = ($scope.currentPage-1)*10; i < $scope.currentPage*10 && i<$scope.totalItems; i++){
            $scope.currentList.push($scope.list[i]);
        }
    };

})
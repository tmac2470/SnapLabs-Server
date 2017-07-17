'use strict';

angular.module('snaplab').controller('ExpListCtrl', function ($scope, $http, authentication) {

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

    $scope.pageChanged = function() {
        $scope.currentList = [];
        for(var i = ($scope.currentPage-1)*10; i < $scope.currentPage*10 && i<$scope.totalItems; i++){
            $scope.currentList.push($scope.list[i]);
        }
    };

})
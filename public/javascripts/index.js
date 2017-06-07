/**
 * Created by MushrChun on 16/5/17.
 */
angular.module('snaplab', [ 'ui.bootstrap','ui.router', 'ui.toggle']);

angular.module('snaplab').config(function($stateProvider, $urlRouterProvider) {
    var indexState = {
        name: 'index',
        url: '/index',
        templateUrl: 'templates/index.html'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: 'templates/about.html'
    };

    var designState = {
        name: 'design',
        url: '/design',
        templateUrl: 'templates/design.html'
    };

    var downloadState = {
        name: 'download',
        url: '/download',
        templateUrl: 'templates/download.html'
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('zone', {
        url: '/',
        templateUrl: 'templates/index.html',
    });
    $stateProvider.state(indexState);
    $stateProvider.state(aboutState);
    $stateProvider.state(designState);
    $stateProvider.state(downloadState);
});

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

angular.module('snaplab').controller('ExpListCtrl', function ($scope, $http) {
    $http.get('experiment')
        .then(function(response) {
            $scope.list = response.data;
            $scope.totalItems = response.data.length;
            $scope.currentPage = 1;
            $scope.maxSize = 5;

            $scope.currentList = [];
            for(var i = 0; i < 10 ;i++){
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

angular.module('snaplab').controller('DesignCtrl', function ($scope, $http) {

    var defaultSensorTag = {
        "connect" : true,
        "title" : "SensorTag",
        "sensors" : {
            "Gyroscope" : {
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                },
                "data" : {
                    "display" : false,
                    "label" : "Gyroscope"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Gyroscope Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Gyroscope"
                },
                "captureOnClick" : false
            },
            "Temperature" : {
                "data" : {
                    "display" : false,
                    "label" : "Temperature"
                },
                "graph" : {
                    "display":true,
                    "graphType" : "spline",
                    "graphTitle" : "Temperature Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Temperature"
                },
                "captureOnClick" : true,
                "grid" : {
                    "griddisplay" : true,
                    "columns" : "4",
                    "rows" : "4"
                },
                "parameters" : {
                    "ambient" : true,
                    "IR" : true
                }
            },
            "Humidity" : {
                "data" : {
                    "display" : true,
                    "label" : "Humidity"
                },
                "graph" : {
                    "display":true,
                    "graphType" : "spline",
                    "graphTitle" : "Humidity Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Humidity"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            },
            "Barometer" : {
                "data" : {
                    "display" : false,
                    "label" : "Barometer"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Barometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Barometer"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            },
            "Accelerometer" : {
                "data" : {
                    "display" : false,
                    "label" : "Accelerometer"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Accelerometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Accelerometer"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            },
            "Magnetometer" : {
                "data" : {
                    "display" : true,
                    "label" : "Magnetometer"
                },
                "graph" : {
                    "graphdisplay" : false,
                    "graphType" : "spline",
                    "graphTitle" : "Magnetometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Magnetic Flux (microT)"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : true,
                    "columns" : "5",
                    "rows" : "5"
                },
                "parameters" : {
                    "xyz" : false,
                    "scalar" : true
                }
            },
            "Luxometer" : {
                "data" : {
                    "display" : false,
                    "label" : "Luxometer"
                },
                "graph" : {
                    "graphType" : "spline",
                    "graphTitle" : "Luxometer Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Luxometer"
                },
                "captureOnClick" : false,
                "grid" : {
                    "griddisplay" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            }
        }
    }

    $scope.expTitle = 'SensorTag Investigation';
    $scope.sampleInterval = 1000;
    $scope.sampleRateStr = 'select';
    $scope.allowDataStorage = false;
    $scope.allowVideo = false;
    $scope.autoStartGraphs = false;

    $scope.sensorTag = [];
    $scope.sensorTag.push(defaultSensorTag);
    $scope.setSampleRate = function(data, str){
        console.log(data);
        $scope.sampleRateStr = str;
        $scope.sampleInterval = 1000/data;
    }
    $scope.duplicate = function(data){
        var newSensorTag = JSON.parse(JSON.stringify(data));
        $scope.sensorTag.push(newSensorTag);
    }
    $scope.store = function(){
        var expCfg = {};
        expCfg.videoAllowed = $scope.allowVideo;
        expCfg.videoPrefix = $scope.expTitle + 'Video';
        expCfg.dataStorageAllowed = $scope.allowDataStorage;
        expCfg.dataStoragePrefix = $scope.expTitle + 'Data';
        expCfg.graphAutoStart = $scope.autoStartGraphs;
        expCfg.labTitle = $scope.expTitle;
        expCfg.sampleInterval = $scope.sampleInterval;
        var sensorTagDict = {};
        for(var i in $scope.sensorTag){
            sensorTagDict[i] = $scope.sensorTag[i]
        }
        expCfg.sensorTags = sensorTagDict;
        console.log(expCfg);
        console.log($scope.expTitle);
        $http.post('experiment', expCfg)
            .then(function(successResponse){
                window.location.href = "/#!/";
            }).then(function(failResponse){

        })

    }


})

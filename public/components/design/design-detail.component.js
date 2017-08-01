(function(window, angular) {'use strict';

angular.module('snaplab.design')
    .component('designDetail', {
        templateUrl: 'components/design/design-detail.template.html',
        controller: ['$scope', '$rootScope', '$http', 'auth', '$state', designController]
    });

function createDefaultSensorTag() {
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
                    "display":false,
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
                    "display":false,
                    "graphType" : "spline",
                    "graphTitle" : "Temperature Graph",
                    "graphXAxis" : "Time (s)",
                    "graphYAxis" : "Temperature"
                },
                "captureOnClick" : true,
                "grid" : {
                    "griddisplay" : false,
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
                    "display" : false,
                    "label" : "Humidity"
                },
                "graph" : {
                    "display":false,
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
                    "display":false,
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
                    "display":false,
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
                    "display" : false,
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
                    "display":false,
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
    };

    return defaultSensorTag;
}

function designController($scope, $rootScope, $http, auth, $state) {

        var self = this;

        var defaultSensorTag;
        if($state.params.id != '0'){

            //TODO: wait for api
        } 
        else{
            defaultSensorTag = createDefaultSensorTag();
        };

        $scope.expTitle = 'SensorTag Investigation';
        $scope.sampleInterval = 1000;
        $scope.sampleRateStr = 'select';
        $scope.allowDataStorage = false;
        $scope.allowVideo = false;
        $scope.autoStartGraphs = false;

        $scope.sensorTag = [];
        $scope.sensorTag.push(defaultSensorTag);
        $scope.setSampleRate = function(data, str){
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
            expCfg.description = $scope.expDesc;
            var sensorTagDict = {};
            for(var i in $scope.sensorTag){
                sensorTagDict[i] = $scope.sensorTag[i]
            }
            expCfg.sensorTags = sensorTagDict;

            var user = auth.getLoginUser();
            expCfg.createdBy = user.id;

            var postCfg = {};
            postCfg.headers = auth.genHeader();

            if(expCfg.description && expCfg.labTitle){
                console.log(expCfg);
                $http.post('experiments/' + user.id, expCfg, postCfg)
                    .then(
                        function successCallback(successResponse){
                            $state.go('welcome');
                            $rootScope.addAlert({ type:'success', msg:'Add Experiment Success' });
                        },
                        function failCallback(failResponse){
                            $rootScope.addAlert({ type:'danger', msg:'Add Experiment Fail' })
                        });
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Experiment Info Incomplete' });
            }
        }
    }
})(window, angular);

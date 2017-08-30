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
                    "display" : false,
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
                    "display" : false,
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
                    "display" : false,
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
                    "display" : false,
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
                    "display" : false,
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
                    "display" : true,
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
                    "display" : false,
                    "columns" : "4",
                    "rows" : "4"
                }
            }
        }
    };

    return defaultSensorTag;
}

function transferToCfg($scope) {
    var expCfg = {};
    expCfg.videoAllowed = $scope.allowVideo;
    expCfg.videoPrefix = $scope.expTitle + 'Video';
    expCfg.dataStorageAllowed = $scope.allowDataStorage;
    expCfg.dataStoragePrefix = $scope.expTitle + 'Data';
    expCfg.graphAutoStart = $scope.autoStartGraphs;
    expCfg.labTitle = $scope.expTitle;
    expCfg.sampleInterval = $scope.sampleInterval;
    expCfg.description = $scope.expDesc;
    expCfg.isPublished = $scope.isPublished || false;
    var sensorTagDict = {};
    for(var i in $scope.sensorTag){
        sensorTagDict[i] = $scope.sensorTag[i]
    }
    expCfg.sensorTags = sensorTagDict;
    return expCfg;
}

function designController($scope, $rootScope, $http, auth, $state) {

        var self = this;

        var defaultSensorTag;
        var expId = $state.params.id;

        $scope.sensorTag = [];
        if(expId != '0'){
            $scope.saveOrUpdate = 'Update';
            $http.get('experiments/' + expId)
                .then(
                    function successCallBack(response){
                        var wrap = response.data;
                        defaultSensorTag = wrap.data.sensorTags[0];
                        console.log(wrap.data);
                        for(var i in wrap.data.sensorTags){
                            $scope.sensorTag[i] = wrap.data.sensorTags[i];
                        }

                        console.log($scope.sensorTag);
                        $scope.expTitle = wrap.data.labTitle;
                        $scope.expDesc = wrap.data.description;
                        $scope.sampleInterval = parseInt(wrap.data.sampleInterval);
                        $scope.sampleRateStr = 'select';
                        $scope.allowDataStorage = wrap.data.dataStorageAllowed;
                        $scope.allowVideo = wrap.data.videoAllowed;
                        $scope.autoStartGraphs = wrap.data.graphAutoStart;
                        $scope.isPublished = wrap.data.isPublished;
                    },
                    function failCallback(response){
                        console.log(response);
                    }
                );
        } 
        else{
            $scope.saveOrUpdate = 'Save';
            defaultSensorTag = createDefaultSensorTag();
            $scope.sensorTag.push(defaultSensorTag);

            $scope.expTitle = 'SensorTag Investigation';
            $scope.sampleInterval = 1000;
            $scope.sampleRateStr = 'select';
            $scope.allowDataStorage = false;
            $scope.allowVideo = false;
            $scope.autoStartGraphs = false;
        };


        $scope.setSampleRate = function(data, str){
            $scope.sampleRateStr = str;
            $scope.sampleInterval = 1000/data;
        }
        $scope.duplicate = function(data){
            var newSensorTag = JSON.parse(JSON.stringify(data));
            $scope.sensorTag.push(newSensorTag);
        }
        $scope.store = function(saveOrUpdate){
            var expCfg = transferToCfg($scope)

            console.log(expCfg);
            var user = auth.getLoginUser();
            expCfg.createdBy = user.id;

            var postCfg = {};
            postCfg.headers = auth.genHeader();

            if(expCfg.description && expCfg.labTitle){
                console.log(expCfg);
                if(saveOrUpdate == 'Save'){
                    $http.post('experiments/user/' + user.id, expCfg, postCfg)
                    .then(
                        function successCallback(successResponse){
                            $state.go('welcome');
                            $rootScope.addAlert({ type:'success', msg:'Add Experiment Success' });
                        },
                        function failCallback(failResponse){
                            $rootScope.addAlert({ type:'danger', msg:'Add Experiment Fail' })
                        });
                }else if(saveOrUpdate == 'Update'){
                    $http.put('experiments/' + expId, expCfg, postCfg)
                    .then(
                        function successCallback(successResponse){
                            $state.go('welcome');
                            $rootScope.addAlert({ type:'success', msg:'Update Experiment Success' });
                        },
                        function failCallback(failResponse){
                            $rootScope.addAlert({ type:'danger', msg:'Update Experiment Fail' })
                        });
                }
            
                
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Experiment Info Incomplete' });
            }
        }
    }
})(window, angular);

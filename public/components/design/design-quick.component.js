(function(window, angular) {'use strict';

angular.module('snaplab.design')
    .component('designQuick', {
        templateUrl: 'components/design/design-quick.template.html',
        controller: ['$scope', '$rootScope', '$http', 'auth', '$state', designController]
    });

function loadDraggableBlocks(self){
    self.quickDesignBlock = [];

    self.TemperatureBlock = [
        { name:'Temperature Graph', url:'images/graphicon.png', parameters: [{field:'Temperature.graph.display', value:true}]},
        { name:'Temperature Data Only', url:'images/dataicon.jpg', parameters: [{field:'Temperature.data.display', value:true}]},
        { name:'4x4 Temperature Grid', url:'images/gridicon.png', parameters: [{field:'Temperature.grid.griddisplay', value:true}]}
    ];

    self.HumidityBlock = [
        { name:'Humidity Graph', url:'images/graphicon.png', parameters: [{field:'Humidity.graph.display', value:true}]},
        { name:'Humidity Data Only', url:'images/dataicon.jpg', parameters: [{field:'Humidity.data.display', value:true}]},
        { name:'4x4 Humidity Grid', url:'images/gridicon.png', parameters: [{field:'Humidity.grid.griddisplay', value:true}]}
    ];

    self.BarometerBlock = [
        { name:'Barometer Graph', url:'images/graphicon.png', parameters: [{field:'Barometer.graph.display', value:true}]},
        { name:'Barometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Barometer.data.display', value:true}]},
        { name:'4x4 Barometer Grid', url:'images/gridicon.png', parameters: [{field:'Barometer.grid.griddisplay', value:true}]}
    ];

    self.AccelerometerBlock = [
        { name:'Accelerometer Graph', url:'images/graphicon.png', parameters: [{field:'Accelerometer.graph.display', value:true}]},
        { name:'Accelerometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Accelerometer.data.display', value:true}]},
        { name:'4x4 Accelerometer Grid', url:'images/gridicon.png', parameters: [{field:'Accelerometer.grid.griddisplay', value:true}]}
    ];

    self.GyroscopeBlock = [
        { name:'Gyroscope Graph', url:'images/graphicon.png', parameters: [{field:'Gyroscope.graph.display', value:true}]},
        { name:'Gyroscope Data Only', url:'images/dataicon.jpg', parameters: [{field:'Gyroscope.data.display', value:true}]},
        { name:'4x4 Gyroscope Grid', url:'images/gridicon.png', parameters: [{field:'Gyroscope.grid.griddisplay', value:true}]}
    ];

    self.MagnetometerBlock = [
        { name:'Magnetometer Graph', url:'images/graphicon.png', parameters: [{field:'Magnetometer.graph.display', value:true}]},
        { name:'Magnetometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Magnetometer.data.display', value:true}]},
        { name:'4x4 Magnetometer Grid', url:'images/gridicon.png', parameters: [{field:'Magnetometer.grid.griddisplay', value:true}]}
    ];

    self.LuxometerBlock = [
        { name:'Luxometer Graph', url:'images/graphicon.png', parameters: [{field:'Luxometer.graph.display', value:true}]},
        { name:'Luxometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Luxometer.data.display', value:true}]},
        { name:'4x4 Luxometer Grid', url:'images/gridicon.png', parameters: [{field:'Luxometer.grid.griddisplay', value:true}]}
    ];

    self.sortableOptions = {
        connectWith: ".qd",
        stop: function(e, ui) {
            console.log("stop");

            //if drop into quick design area:
            var flag = ui.item.sortable.droptargetModel == self.quickDesignBlock? true: false;
            console.log(flag);


            //get the element who moves
            var movedItem = ui.item.sortable.model;
            if(flag){
                // if move in, set parameter values
                movedItem.parameters.forEach(function(parameter) {
                    var splits = parameter.field.split('.');
                    defaultSensorTag.sensors[splits[0]][splits[1]][splits[2]] = parameter.value;
                });
            }else{
                //if move out of area, parameter values set to reverse
                movedItem.parameters.forEach(function(parameter) {
                    var splits = parameter.field.split('.');
                    defaultSensorTag.sensors[splits[0]][splits[1]][splits[2]] = !parameter.value;
                });
            }

        }
    };
}

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
        loadDraggableBlocks(self);

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
            postCfg.headers = auth.genHeader(auth.getToken());

            if(expCfg.description && expCfg.labTitle){
                $http.post('experiments/' + user.id, expCfg, postCfg)
                    .then(
                        function successCallback(successResponse){
                            window.location.href = "/#!/";
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
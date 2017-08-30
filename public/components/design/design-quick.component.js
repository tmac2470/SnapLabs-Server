(function(window, angular) {'use strict';

angular.module('snaplab.design')
    .component('designQuick', {
        templateUrl: 'components/design/design-quick.template.html',
        controller: ['$rootScope', '$http', 'auth', '$state','$uibModal', designController]
    });

function loadDraggableBlocks(self, defaultSensorTag, popNewAlert){
    self.quickDesignBlock = [];

    self.TemperatureBlock = [
        { class:'Temperature', name:'Temperature Graph', url:'images/graphicon.png', parameters: [{field:'Temperature.graph.display', value:true}]},
        { class:'Temperature', name:'Temperature Data Only', url:'images/dataicon.jpg', parameters: [{field:'Temperature.data.display', value:true}]},
        { class:'Temperature', name:'4x4 Temperature Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Temperature.grid.columns', value:4}, {field:'Temperature.grid.rows', value:4}, {field:'Temperature.grid.display', value:true}]}
    ];

    self.HumidityBlock = [
        { class:'Humidity', name:'Humidity Graph', url:'images/graphicon.png', parameters: [{field:'Humidity.graph.display', value:true}]},
        { class:'Humidity', name:'Humidity Data Only', url:'images/dataicon.jpg', parameters: [{field:'Humidity.data.display', value:true}]},
        { class:'Humidity', name:'4x4 Humidity Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Humidity.grid.columns', value:4}, {field:'Humidity.grid.rows', value:4}, {field:'Humidity.grid.display', value:true}]}
    ];

    self.BarometerBlock = [
        { class:'Barometer', name:'Barometer Graph', url:'images/graphicon.png', parameters: [{field:'Barometer.graph.display', value:true}]},
        { class:'Barometer', name:'Barometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Barometer.data.display', value:true}]},
        { class:'Barometer', name:'4x4 Barometer Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Barometer.grid.columns', value:4}, {field:'Barometer.grid.rows', value:4}, {field:'Barometer.grid.display', value:true}]}
    ];

    self.AccelerometerBlock = [
        { class:'Accelerometer', name:'Accelerometer Graph', url:'images/graphicon.png', parameters: [{field:'Accelerometer.graph.display', value:true}]},
        { class:'Accelerometer', name:'Accelerometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Accelerometer.data.display', value:true}]},
        { class:'Accelerometer', name:'4x4 Accelerometer Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Accelerometer.grid.columns', value:4}, {field:'Accelerometer.grid.rows', value:4}, {field:'Accelerometer.grid.display', value:true}]}
    ];

    self.GyroscopeBlock = [
        { class:'Gyroscope', name:'Gyroscope Graph', url:'images/graphicon.png', parameters: [{field:'Gyroscope.graph.display', value:true}]},
        { class:'Gyroscope', name:'Gyroscope Data Only', url:'images/dataicon.jpg', parameters: [{field:'Gyroscope.data.display', value:true}]},
        { class:'Gyroscope', name:'4x4 Gyroscope Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Gyroscope.grid.columns', value:4}, {field:'Gyroscope.grid.rows', value:4}, {field:'Gyroscope.grid.display', value:true}]}
    ];

    self.MagnetometerBlock = [
        { class:'Magnetometer', name:'Magnetometer Graph', url:'images/graphicon.png', parameters: [{field:'Magnetometer.graph.display', value:true}]},
        { class:'Magnetometer', name:'Magnetometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Magnetometer.data.display', value:true}]},
        { class:'Magnetometer', name:'4x4 Magnetometer Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Magnetometer.grid.columns', value:4}, {field:'Magnetometer.grid.rows', value:4}, {field:'Magnetometer.grid.display', value:true}]}
    ];

    self.LuxometerBlock = [
        { class:'Luxometer', name:'Luxometer Graph', url:'images/graphicon.png', parameters: [{field:'Luxometer.graph.display', value:true}]},
        { class:'Luxometer', name:'Luxometer Data Only', url:'images/dataicon.jpg', parameters: [{field:'Luxometer.data.display', value:true}]},
        { class:'Luxometer', name:'4x4 Luxometer Grid', url:'images/gridicon.png', tunable:true, parameters: [{field:'Luxometer.grid.columns', value:4}, {field:'Luxometer.grid.rows', value:4}, {field:'Luxometer.grid.display', value:true}]}
    ];

    self.sortableOptions = {
        connectWith: ".qd",

        update: function(e, ui) {
            if(!ui.item.sortable.received){
                if(ui.item.sortable.sourceModel == self.quickDesignBlock){
                    popNewAlert('moving out of quick panel is forbidden');
                    ui.item.sortable.cancel();
                }
                if(ui.item.sortable.droptargetModel == self.quickDesignBlock){
                    var sourceModel = ui.item.sortable.sourceModel;
                    var numOfGraphOrGrid = sourceModel.filter(function(item) {
                        var hasGraph = item.name.indexOf('Graph')>=0;
                        var hasGrid = item.name.indexOf('Grid')>=0;
                        return hasGraph||hasGrid;
                    }).length;
                    if(numOfGraphOrGrid<2 && 
                        (ui.item.sortable.model.name.indexOf('Grid')>=0 
                        || ui.item.sortable.model.name.indexOf('Graph')>=0)){
                        popNewAlert('Only one can be selected from Graph and Grid.');
                        ui.item.sortable.cancel();
                    }
                    console.log('move in');
                }
            }else{//received
            
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

function designController($rootScope, $http, auth, $state, $uibModal) {

        var self = this;

        var defaultSensorTag;
        if($state.params.id != '0'){

            //TODO: wait for api
        } 
        else{
            defaultSensorTag = createDefaultSensorTag();
        };

        function popNewAlert(content) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/modal.template.html',
                controller: 'AlertModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                resolve: {
                    content: function () {
                        return content;
                    }
                }
            });
    
            modalInstance.result
                .then(
                    function closeDone() {
                    },
                    function dismissDone() {
                        console.log('Modal dismissed at: ' + new Date());
                    }
                );
        };

        function popTuneWindow(item){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/tune-modal.template.html',
                controller: 'TuneModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });


            modalInstance.result
            .then(
                function closeDone() {
                },
                function dismissDone() {
                    console.log('Modal dismissed at: ' + new Date());
                }
            );
        }

        loadDraggableBlocks(self, defaultSensorTag, popNewAlert);

        /*
        * return block back to origin
        */
        self.returnBack = function(item) {
            var indexInQuick = self.quickDesignBlock.indexOf(item);
            self.quickDesignBlock.splice(indexInQuick,1);
            var classification = item.class+'Block';
            self[classification].push(item);
        }

        self.tune = function(item) {

            console.log(item);
            popTuneWindow(item);
        }

        self.expTitle = 'SensorTag Investigation';
        self.sampleInterval = 1000;
        self.sampleRateStr = 'select';
        self.allowDataStorage = false;
        self.allowVideo = false;
        self.autoStartGraphs = false;

        self.sensorTag = [];
        self.sensorTag.push(defaultSensorTag);
        self.setSampleRate = function(data, str){
            self.sampleRateStr = str;
            self.sampleInterval = 1000/data;
        }
        self.store = function(){
            var expCfg = {};
            expCfg.videoAllowed = self.allowVideo;
            expCfg.videoPrefix = self.expTitle + 'Video';
            expCfg.dataStorageAllowed = self.allowDataStorage;
            expCfg.dataStoragePrefix = self.expTitle + 'Data';
            expCfg.graphAutoStart = self.autoStartGraphs;
            expCfg.labTitle = self.expTitle;
            expCfg.sampleInterval = self.sampleInterval;
            expCfg.description = self.expDesc;
            expCfg.isPublished = self.isPublished || false;
            var sensorTagDict = {};
            for(var i in self.sensorTag){
                sensorTagDict[i] = self.sensorTag[i]
            }
            expCfg.sensorTags = sensorTagDict;
            self.quickDesignBlock.forEach(function(block) {
                var parameters = block.parameters;
                parameters.forEach(function(parameter){
                    console.log('parameter: ', parameter);
                    var splits = parameter.field.split('.');
                    defaultSensorTag.sensors[splits[0]][splits[1]][splits[2]] = parameter.value;
                });
            });
            var user = auth.getLoginUser();
            expCfg.createdBy = user.id;

            var postCfg = {};
            postCfg.headers = auth.genHeader(auth.getToken());

            console.log('expCfg', expCfg);

            if(expCfg.description && expCfg.labTitle){
                $http.post('experiments/user/' + user.id, expCfg, postCfg)
                    .then(
                        function successCallback(successResponse){
                            window.location.href = "/#!/";
                            $rootScope.addAlert({ type:'success', msg: successResponse.data.message});
                        },
                        function failCallback(failResponse){
                            $rootScope.addAlert({ type:'danger', msg: successResponse.data.message })
                        });
            }else{
                $rootScope.addAlert({ type:'danger', msg:'Experiment Info Incomplete' });
            }
        }
    }
})(window, angular);
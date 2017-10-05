'use strict';

angular.module('snaplab.modal').controller('TuneModalInstanceCtrl', function ($uibModalInstance, item) {
    var self = this;

    item.parameters.forEach(function(parameter){
        if(parameter.field.indexOf('row')>=0){
            self.row = parameter.value;
        }
        if(parameter.field.indexOf('col')>=0){
            self.col = parameter.value;
        }
        if(parameter.field.indexOf('ambient')>=0){
            self.ambientTemperature = parameter.value;
        }
        if(parameter.field.indexOf('IR')>=0){
            self.irTemperature = parameter.value;
        }
        if(parameter.field.indexOf('captureOnClick')>=0){
            self.captureOnClick = parameter.value;
        }
        if(parameter.field.indexOf('gridTitle')>=0){
            self.gridTitle = parameter.value;
        }
        if(parameter.field.indexOf('graphTitle')>=0){
            self.graphTitle = parameter.value;
        }
        if(parameter.field.indexOf('xyz')>=0){
            self.xyzValue = parameter.value;
        }
        if(parameter.field.indexOf('scalar')>=0){
            self.scalarValue = parameter.value;
        }
    });

    self.aiShow = false;
    self.zyxShow = false;

    switch(item.class){
        case 'Temperature': self.aiShow = true;break;
        case 'Humidity':
        case 'Barometer':
        case 'Gyroscope':
        case 'Luxometer': break;
        case 'Accelerometer':
        case 'Magnetometer': self.xyzShow = true;break;
    }

    self.ok = function () {

        if(item.type == 'Grid'){
            self.row = self.row || 4;
            self.col = self.col || 4;
            var oldName =item.name;
            var cutPos = oldName.indexOf(" ");
            var newName = self.row + "x" + self.col + " " + oldName.substr(cutPos);
            item.name = newName;
            item.parameters.forEach(function(parameter){
                if(parameter.field.indexOf('row')>=0){
                    parameter.value = self.row;
                    console.log('set row');
                }
                if(parameter.field.indexOf('col')>=0){
                    parameter.value = self.col;
                    console.log('set col');
                }
            });
        }

        if(self.ambientTemperature){
            item.parameters.push(
                {
                    field: item.class + '.' + 'parameters' + '.' + 'ambient', 
                    value: self.ambientTemperature
                });
        }

        if(self.irTemperature){
            item.parameters.push(
                {
                    field: item.class + '.' + 'parameters' + '.' + 'IR', 
                    value: self.irTemperature
                });
        }

        if(self.xyzValue){
            item.parameters.push(
                {
                    field: item.class + '.' + 'parameters' + '.' + 'xyz', 
                    value: self.xyzValue
                });
        }

        if(self.scalarValue){
            item.parameters.push(
                {
                    field: item.class + '.' + 'parameters' + '.' + 'scalar', 
                    value: self.scalarValue
                }); 
        }

        
        if(self.graphTitle){
            item.parameters.push(
                    {
                        field: item.class + '.' + item.type.toLowerCase() + '.' + 'graphTitle', 
                        value: self.graphTitle
                    });
        }
        if(self.gridTitle){
            item.parameters.push(
                {
                    field: item.class + '.' + item.type.toLowerCase() + '.' + 'gridTitle', 
                    value: self.gridTitle
                });
        }
        if(self.captureOnClick){
            item.parameters.push(
                {
                    field: item.class + '.' + 'captureOnClick', 
                    value: self.captureOnClick
                });
        }
        
        $uibModalInstance.close();
    };
    self.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

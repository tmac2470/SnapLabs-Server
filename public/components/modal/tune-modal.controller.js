'use strict';

angular.module('snaplab.modal').controller('TuneModalInstanceCtrl', function ($uibModalInstance, item) {
    var self = this;
    self.row = 4;
    self.col = 4;
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
        $uibModalInstance.close();
    };
    self.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

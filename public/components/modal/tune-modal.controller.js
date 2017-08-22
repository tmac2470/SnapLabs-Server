'use strict';

angular.module('snaplab.modal').controller('TuneModalInstanceCtrl', function ($uibModalInstance, item) {
    var self = this;
    self.row = 4;
    self.col = 4;

    self.ok = function () {
        self.row = self.row || 4;
        self.col = self.col || 4;
        var oldName =item.name;
        var cutPos = oldName.indexOf(" ");
        var newName = self.row + "x" + self.col + " " + oldName.substr(cutPos);
        item.name = newName;
        $uibModalInstance.close();
    };
    self.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

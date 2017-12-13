(function () {
  'use strict';

  angular
    .module('snaplab.design')
    .factory('design', factory);

  function factory() {

    function loadDraggableBlocks(self, defaultSensorTag, popNewAlert) {
      self.quickDesignBlock = [];

      self.TemperatureBlock = [
        {
          class: 'Temperature', type: 'Graph', name: 'Temperature Graph &nbsp;',
          url: 'images/graphicon.png', tunable: true,
          parameters: [
            { field: 'Temperature.graph.display', value: true },
            { field: 'Temperature.parameters.ambient', value: true },
            { field: 'Temperature.parameters.IR', value: true }
          ]
        },
        {
          class: 'Temperature', type: 'Data', name: 'Temperature Data &nbsp;',
          url: 'images/dataicon.jpg', tunable: true, parameters: [
            { field: 'Temperature.data.display', value: true },
            { field: 'Temperature.parameters.ambient', value: true },
            { field: 'Temperature.parameters.IR', value: true }]
        },
        {
          class: 'Temperature', type: 'Grid', name: '4x4 Temperature Grid',
          url: 'images/gridicon.png', tunable: true, parameters: [
            { field: 'Temperature.grid.columns', value: 4 },
            { field: 'Temperature.grid.rows', value: 4 },
            { field: 'Temperature.grid.display', value: true },
            { field: 'Temperature.parameters.ambient', value: true },
            { field: 'Temperature.parameters.IR', value: true }]
        }
      ];

      self.HumidityBlock = [
        {
          class: 'Humidity', type: 'Graph', name: 'Humidity Graph &nbsp;',
          url: 'images/graphicon.png', tunable: true, parameters: [
            { field: 'Humidity.graph.display', value: true }]
        },
        { class: 'Humidity', type: 'Data', name: 'Humidity Data Only', url: 'images/dataicon.jpg', parameters: [{ field: 'Humidity.data.display', value: true }] },
        { class: 'Humidity', type: 'Grid', name: '4x4 Humidity Grid &nbsp;', url: 'images/gridicon.png', tunable: true, parameters: [{ field: 'Humidity.grid.columns', value: 4 }, { field: 'Humidity.grid.rows', value: 4 }, { field: 'Humidity.grid.display', value: true }] }
      ];

      self.BarometerBlock = [
        {
          class: 'Barometer', type: 'Graph', name: 'Barometer Graph &nbsp;',
          url: 'images/graphicon.png', tunable: true, parameters: [
            { field: 'Barometer.graph.display', value: true }]
        },
        {
          class: 'Barometer', type: 'Data', name: 'Barometer Data &nbsp;',
          url: 'images/dataicon.jpg', parameters: [
            { field: 'Barometer.data.display', value: true }]
        },
        {
          class: 'Barometer', type: 'Grid', name: '4x4 Barometer Grid',
          url: 'images/gridicon.png', tunable: true, parameters: [
            { field: 'Barometer.grid.columns', value: 4 },
            { field: 'Barometer.grid.rows', value: 4 },
            { field: 'Barometer.grid.display', value: true }]
        }
      ];

      self.AccelerometerBlock = [
        {
          class: 'Accelerometer', type: 'Graph', name: 'Accelerometer Graph',
          url: 'images/graphicon.png', tunable: true,
          parameters: [
            { field: 'Accelerometer.graph.display', value: true },
            { field: 'Magnetometer.graph.display', value: true },
            { field: 'Accelerometer.parameters.xyz', value: true },
            { field: 'Accelerometer.parameters.scalar', value: true }]
        },
        {
          class: 'Accelerometer', type: 'Data', name: 'Accelerometer Data Only',
          url: 'images/dataicon.jpg', tunable: true,
          parameters: [
            { field: 'Accelerometer.data.display', value: true },
            { field: 'Magnetometer.graph.display', value: true },
            { field: 'Accelerometer.parameters.xyz', value: true },
            { field: 'Accelerometer.parameters.scalar', value: true }]
        },
        {
          class: 'Accelerometer', type: 'Grid', name: '4x4 Accelerometer Grid', url: 'images/gridicon.png', tunable: true,
          parameters: [
            { field: 'Accelerometer.grid.columns', value: 4 },
            { field: 'Accelerometer.grid.rows', value: 4 },
            { field: 'Accelerometer.grid.display', value: true },
            { field: 'Magnetometer.graph.display', value: true },
            { field: 'Accelerometer.parameters.xyz', value: true },
            { field: 'Accelerometer.parameters.scalar', value: true }]
        }
      ];

      self.GyroscopeBlock = [
        {
          class: 'Gyroscope', type: 'Graph', name: 'Gyroscope Graph &nbsp;',
          url: 'images/graphicon.png', tunable: true,
          parameters: [{ field: 'Gyroscope.graph.display', value: true }]
        },
        {
          class: 'Gyroscope', type: 'Data', name: 'Gyroscope Data &nbsp;',
          url: 'images/dataicon.jpg', parameters: [
            { field: 'Gyroscope.data.display', value: true }]
        },
        {
          class: 'Gyroscope', type: 'Grid', name: '4x4 Gyroscope Grid',
          url: 'images/gridicon.png', tunable: true, parameters: [
            { field: 'Gyroscope.grid.columns', value: 4 },
            { field: 'Gyroscope.grid.rows', value: 4 },
            { field: 'Gyroscope.grid.display', value: true }]
        }
      ];

      self.MagnetometerBlock = [
        {
          class: 'Magnetometer', type: 'Graph', name: 'Magnetometer Graph',
          url: 'images/graphicon.png', tunable: true,
          parameters: [
            { field: 'Magnetometer.graph.display', value: true },
            { field: 'Magnetometer.parameters.xyz', value: true },
            { field: 'Magnetometer.parameters.scalar', value: true }]
        },
        {
          class: 'Magnetometer', type: 'Data', name: 'Magnetometer Data',
          url: 'images/dataicon.jpg', tunable: true,
          parameters: [
            { field: 'Magnetometer.data.display', value: true },
            { field: 'Magnetometer.parameters.xyz', value: true },
            { field: 'Magnetometer.parameters.scalar', value: true }]
        },
        {
          class: 'Magnetometer', type: 'Grid', name: '4x4 Magnetometer Grid',
          url: 'images/gridicon.png', tunable: true,
          parameters: [
            { field: 'Magnetometer.grid.columns', value: 4 },
            { field: 'Magnetometer.grid.rows', value: 4 },
            { field: 'Magnetometer.grid.display', value: true },
            { field: 'Magnetometer.parameters.xyz', value: true },
            { field: 'Magnetometer.parameters.scalar', value: true }]
        }
      ];

      self.LuxometerBlock = [
        {
          class: 'Luxometer', type: 'Graph', name: 'Luxometer Graph &nbsp;',
          url: 'images/graphicon.png', tunable: true, parameters: [
            { field: 'Luxometer.graph.display', value: true }]
        },
        {
          class: 'Luxometer', type: 'Data', name: 'Luxometer Data &nbsp;',
          url: 'images/dataicon.jpg', parameters: [
            { field: 'Luxometer.data.display', value: true }]
        },
        {
          class: 'Luxometer', type: 'Grid', name: '4x4 Luxometer Grid',
          url: 'images/gridicon.png', tunable: true, parameters: [
            { field: 'Luxometer.grid.columns', value: 4 },
            { field: 'Luxometer.grid.rows', value: 4 },
            { field: 'Luxometer.grid.display', value: true }]
        }
      ];

      self.sortableOptions = {
        connectWith: '.qd',

        update: function (e, ui) {
          if (!ui.item.sortable.received) {
            if (ui.item.sortable.sourceModel == self.quickDesignBlock) {
              popNewAlert('moving out of quick panel is forbidden');
              ui.item.sortable.cancel();
            }
            if (ui.item.sortable.droptargetModel == self.quickDesignBlock) {
              var sourceModel = ui.item.sortable.sourceModel;
              var numOfGraphOrGrid = sourceModel.filter(function (item) {
                var hasGraph = item.name.indexOf('Graph') >= 0;
                var hasGrid = item.name.indexOf('Grid') >= 0;
                return hasGraph || hasGrid;
              }).length;
              if (numOfGraphOrGrid < 2 &&
                (ui.item.sortable.model.name.indexOf('Grid') >= 0
                  || ui.item.sortable.model.name.indexOf('Graph') >= 0)) {
                popNewAlert('Only one can be selected from Graph and Grid.');
                ui.item.sortable.cancel();
              }
              console.log('move in');
            }
          } else {//received

          }
        }
      };
    }

    function createDefaultSensorTag() {
      var defaultSensorTag = {
        'connect': true,
        'title': 'SensorTag',
        'sensors': {
          'Gyroscope': {
            'grid': {
              'gridTitle': 'Gyroscope Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            },
            'data': {
              'display': false,
              'label': 'Gyroscope'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Gyroscope Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Gyroscope'
            },
            'captureOnClick': false
          },
          'Temperature': {
            'data': {
              'display': false,
              'label': 'Temperature'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Temperature Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Temperature'
            },
            'captureOnClick': false,
            'grid': {
              'gridTitle': 'Temperature Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            },
            'parameters': {
              'ambient': true,
              'IR': true
            }
          },
          'Humidity': {
            'data': {
              'display': false,
              'label': 'Humidity'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Humidity Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Humidity'
            },
            'captureOnClick': false,
            'grid': {
              'gridTitle': 'Humidity Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            }
          },
          'Barometer': {
            'data': {
              'display': false,
              'label': 'Barometer'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Barometer Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Barometer'
            },
            'captureOnClick': false,
            'grid': {
              'gridTitle': 'Barometer Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            }
          },
          'Accelerometer': {
            'data': {
              'display': false,
              'label': 'Accelerometer'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Accelerometer Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Accelerometer'
            },
            'captureOnClick': false,
            'grid': {
              'gridTitle': 'Accelerometer Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            },
            'parameters': {
              'xyz': false,
              'scalar': false
            }
          },
          'Magnetometer': {
            'data': {
              'display': false,
              'label': 'Magnetometer'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Magnetometer Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Magnetic Flux (microT)'
            },
            'captureOnClick': false,
            'grid': {
              'gridTitle': 'Magnetometer Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            },
            'parameters': {
              'xyz': true,
              'scalar': true
            }
          },
          'Luxometer': {
            'data': {
              'display': false,
              'label': 'Luxometer'
            },
            'graph': {
              'display': false,
              'graphType': 'spline',
              'graphTitle': 'Luxometer Graph',
              'graphXAxis': 'Time (s)',
              'graphYAxis': 'Luxometer'
            },
            'captureOnClick': false,
            'grid': {
              'gridTitle': 'Luxometer Grid',
              'display': false,
              'columns': '4',
              'rows': '4'
            }
          }
        }
      };

      return defaultSensorTag;
    }

    return {
      loadDraggableBlocks: loadDraggableBlocks,
      createDefaultSensorTag: createDefaultSensorTag
    };
  }
})();

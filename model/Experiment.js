/**
 * Created by MushrChun on 22/5/17.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var experimentSchema = new Schema({
    labTitle: String,
    sampleInterval: String,
    captureOnClick: String,
    graphs: String,
    grids: String,
    sensorTags: Schema.Types.Mixed,
    dataStorageAllowed: String,
    dataStoragePrefix: String,
    videoPrefix: String,
    graphAutoStart: String
});


var Experiment = mongoose.model('Experiments', experimentSchema);
module.exports = Experiment;
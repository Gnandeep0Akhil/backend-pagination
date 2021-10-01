const dbClient = require('../dBconnect/connect');
const { Schema }  = require('mongoose');


var populationSchema = new Schema({
    city: String,
    loc: Array,
    pop: Number,
    state: String,
})

const populationModel = dbClient.model('population', populationSchema);

module.exports.populationModel = populationModel;
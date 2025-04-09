const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    numbers:[Number],
    average: Number,
   

});

module.exports = mongoose.model('Result',resultSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PipeStatusSchema = new Schema({
    name: {
        type: String,
        required: [true]
    }
});

const PipeStatus = mongoose.model('PipeStatus',PipeStatusSchema);

module.exports = PipeStatus;
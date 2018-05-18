const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PipeDetailsSchema = new Schema({
    length: {
        type: Number
    },
    measured_pressure: {
        type: Number
    },
    max_pressure: {
        type: Number
    }, 
    pipe_status_id:{
        type: Schema.Types.ObjectId,
        ref: 'PipeStatus'
    },
    created_by:{
        type: Number
    }
}, 
{timestamps: true}
);

const Pipe_details = mongoose.model('PipeDetail',PipeDetailsSchema);

module.exports = Pipe_details;
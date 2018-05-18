const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PipesSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    created_by: {
        type: Number,
        required: [true]
    },
    deleted: {
        type:Boolean,
        default: false
    },
    location_id: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    pipe_detail_id: {
        type: Schema.Types.ObjectId,
        ref: 'PipeDetail'
    },
    start_lat: {
        type: Number,
        required: [true]
    },
    start_lng: {
        type: Number,
        required: [true]
    },
    end_lat: {
        type: Number,
        required: [true]
    },
    end_lng: {
        type: Number,
        required: [true]
    },
    status:{
        type: String
    }
}, 
{timestamps: true}
);

const Pipe = mongoose.model('Pipe',PipesSchema);

module.exports = Pipe;
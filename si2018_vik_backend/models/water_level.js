const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaterLevelSchema = new Schema({
    name:{
        type: String
    },
    value:{
        type: Number,
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
    lat: {
        type: Number,
        required: [true]
    },
    lng: {
        type: Number,
        required: [true]
    },
    pipe_id: {
        type: Schema.Types.ObjectId,
        ref: 'pipes'
    }
}, 
{timestamps: true}
);

const WaterLevel = mongoose.model('WaterLevel',WaterLevelSchema);

module.exports = WaterLevel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaterLevelSchema = new Schema({
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
    }
}, 
{timestamps: true}
);

const WaterLevel = mongoose.model('WaterLevel',WaterLevelSchema);

module.exports = WaterLevel;
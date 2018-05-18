const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaterLevelHistorySchema = new Schema({
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
        ref: 'Location',
        required: [true]
    },
    water_level_id: {
        type: Schema.Types.ObjectId,
        ref: 'WaterLevel'
    }
}, 
{timestamps: true}
);

const WaterLevelHistory = mongoose.model('WaterLevelHistory',WaterLevelHistorySchema);

module.exports = WaterLevelHistory;
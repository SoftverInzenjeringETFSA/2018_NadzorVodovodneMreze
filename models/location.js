const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    lat: {
        type: Number,
        required: [true]
    },
    lon: {
        type: Number,
        required: [true]
    },
    created_by:{
        type: Number,
        required: [true]
    },
    water_level_id:{
        type: Schema.Types.ObjectId,
        ref: 'WaterLevel',
        required: [true]
    },
    deleted:{
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

const Location = mongoose.model('Location',LocationSchema);

module.exports = Location;
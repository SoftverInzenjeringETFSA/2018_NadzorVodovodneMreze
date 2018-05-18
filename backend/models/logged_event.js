const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoggedEventSchema = new Schema({
        user_id: {
            type: Number,
            required: [true]
        },
        activity: {
            type: String,
            required: [true]
        },
        timestamp: {
            type: Number,
            required: [true],
            default: Date.now()
        },
    }, {
        timestamps: true
    }
);

const LoggedEvent = mongoose.model('LoggedEvent', LoggedEventSchema);

module.exports = LoggedEvent;

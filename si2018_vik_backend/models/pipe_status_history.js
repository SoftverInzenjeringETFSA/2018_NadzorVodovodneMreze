const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PipeStatusHistorySchema = new Schema({
    created_by: {
        type: Number,
        required: [true]
    },
    deleted: {
        type:Boolean,
        default: false
    },
    pipe_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pipe',
        required: [true]
    },
    pipe_status_id: {
        type: Schema.Types.ObjectId,
        ref: 'PipeStatus'
    }
}, 
{timestamps: true}
);

const PipeStatusHistory = mongoose.model('PipeStatusHistory',PipeStatusHistorySchema);

module.exports = PipeStatusHistory;
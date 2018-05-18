const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PipesSectionSchema = new Schema({
    pipe_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pipe'
    },
    section_id: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    },
    created_by: {
        type: Number,
        required: [true]
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, 
{timestamps: true}
);

const PipeSection = mongoose.model('PipeSection',PipesSectionSchema);

module.exports = Pipe;
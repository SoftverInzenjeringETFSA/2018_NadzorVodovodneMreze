
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
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
    active: {
        type: Boolean,
        default: true
    },
    population: {
        type: Number,
        required: [true]
    },
    lat:{
        type: Number,
        required: [true]
    },
    lng:{
        type: Number,
        required: [true]
    }  
}, 
{timestamps: true}
);

const Section = mongoose.model('Section',SectionSchema);

module.exports = Section;

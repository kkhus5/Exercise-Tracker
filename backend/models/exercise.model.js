const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// this time we have four fields, with two validations per field
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true},
    duration: {  type: Number, required: true},
    date: { type: Date, required: true},
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
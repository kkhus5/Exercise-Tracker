// first, require mongoose
const mongoose = require('mongoose');

// then, we get a new mongoose schema
// all mongoose schema starts basically the same
const Schema = mongoose.Schema;

// this is the schema for the users
// it only has a single field: username
// this field has validations: type, required, unique, etc.
// for example, trim means it will trim whitespace at the end if someone types spaces at the end
// timestamps creates fields for when it was created and when it was modified
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// a lot of this will look the same for any mongoose schema
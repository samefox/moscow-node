const mongoose = require('mongoose');

const schema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    country: {
        type: String
    },
    sex: {
        type: Number
    },
    age: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Client', schema);

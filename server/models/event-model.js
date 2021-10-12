const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: false},
        date: {type: String, required: true}
            },
    {timestamps: true},
)

module.exports = mongoose.model('events', Event);
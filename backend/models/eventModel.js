const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
});

const Event = model('Event', eventSchema);
module.exports = { Event }
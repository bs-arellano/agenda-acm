const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
});

const Note = model('Note', noteSchema);
module.exports = { Note }
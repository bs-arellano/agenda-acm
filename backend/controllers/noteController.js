const jwt = require('jsonwebtoken');
const { Note } = require('../models/noteModel');
const { Event } = require('../models/eventModel');
const { User } = require("../models/userModel")
const { JWT_SECRET } = require('../configs/constants');

const noteController = {
    createNote: async (req, res) => {
        try {
            const { title, body, eventId } = req.body;
            const userId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const event = await Event.findById(eventId);
            if (!event) {
                console.log("Evento no encontrado")
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            if (event.user.toString() !== userId) {
                console.log("No autorizado")
                return res.status(403).json({ message: 'No autorizado' });
            }

            const newNote = new Note({
                title,
                body,
                event: eventId, // Almacena solo el ID del evento en la nota
            });

            await newNote.save();
            return res.status(201).json({ message: 'Nota creada exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getNotesByEvent: async (req, res) => {
        try {
            const { eventId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            if (event.user.toString() !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const notes = await Note.find({ event: eventId });

            return res.status(200).json(notes);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getNotesById: async (req, res) => {
        try {
            const { noteId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;
    
            const note = await Note.findById(noteId);
            if (!note) {
                return res.status(404).json({ message: 'Nota no encontrada' });
            }

            // Verifica si el usuario tiene permisos para acceder a la nota
            const event = await Event.findById(note.event.toString())
            if (!event){
                throw new Error('Error al obtener el evento')
            }
            const user = await User.findById(event.user.toString())
            if (!user){
                throw new Error('Error al obtener el usuario')
            }
            if (user._id != tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }
            return res.status(200).json(note);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    updateNote: async (req, res) => {
        try {
            const { noteId } = req.params;
            const { title, body } = req.body;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const note = await Note.findById(noteId);

            if (!note) {
                return res.status(404).json({ message: 'Nota no encontrada' });
            }

            const event = await Event.findById(note.event);
            if (!event) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            if (event.user.toString() !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const updateFields = {};
            if (title) updateFields.title = title;
            if (body) updateFields.body = body;

            await Note.findByIdAndUpdate(
                noteId,
                updateFields,
                { new: true }
            );

            return res.status(200).json({ message: 'Nota actualizada exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    deleteNote: async (req, res) => {
        try {
            const { noteId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const note = await Note.findById(noteId);

            if (!note) {
                return res.status(404).json({ message: 'Nota no encontrada' });
            }

            const event = await Event.findById(note.event);
            if (!event) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            if (event.user.toString() !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const deletedNote = await Note.findByIdAndDelete(noteId);

            return res.status(200).json({ message: 'Nota eliminada exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
};

module.exports = { noteController };
const jwt = require('jsonwebtoken');
const { Event } = require('../models/eventModel');
const { Category } = require('../models/categoryModel');
const { JWT_SECRET } = require('../configs/constants');

const eventController = {
    createEvent: async (req, res) => {
        try {
            const { startDateTime, endDateTime, title, description, categories } = req.body;
            const userId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const newEvent = new Event({
                startDateTime,
                endDateTime,
                title,
                description,
                user: userId,
                categories,
            });

            await newEvent.save();
            return res.status(201).json({ message: 'Evento creado exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getEventById: async (req, res) => {
        try {
            const { eventId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;
            const event = await Event.findById(eventId).populate('categories');
            if (!event) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }
            if (event.user.toString() !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }
            return res.status(200).json(event);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getEventsByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            if (userId !== tokenUserId) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const events = await Event.find({ user: userId }).populate('categories');
            return res.status(200).json(events);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const { eventId } = req.params;
            const { startDateTime, endDateTime, title, description, categories } = req.body;
            const tokenUserId = jwt.verify(req.headers.token, JWT_SECRET).id;

            const event = await Event.findById(eventId);

            if (event) {
                if (event.user.toString() !== tokenUserId) {
                    return res.status(403).json({ message: 'No autorizado' });
                }
            }
            else {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }

            const updateFields = {};
            if (startDateTime) updateFields.startDateTime = startDateTime;
            if (endDateTime) updateFields.endDateTime = endDateTime;
            if (title) updateFields.title = title;
            if (description) updateFields.description = description;
            if (categories) updateFields.categories = categories;

            await Event.findByIdAndUpdate(
                eventId,
                updateFields,
                { new: true }
            );

            return res.status(200).json({ message: 'Evento actualizado exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    deleteEvent: async (req, res) => {
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

            const deletedEvent = await Event.findByIdAndDelete(eventId);

            return res.status(200).json({ message: 'Evento eliminado exitosamente' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
};

module.exports = { eventController };
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const { User } = require('../models/userModel.js')
const { JWT_SECRET, DB_ENCRYPTION_KEY } = require('../configs/constants')

const saltRounds = 10;

const userController = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const existingUser = await User.findOne({ email: email })
            if (existingUser) {
                return res.status(409).json({ message: 'El usuario ya existe' });
            }
            const salt = bcrypt.genSaltSync(saltRounds);
            const newUser = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt)
            })
            await newUser.save()
            return res.status(201).json({ message: 'Usuario registrado exitosamente' })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }
            matchingPassword = bcrypt.compareSync(password, user.password);
            if (!matchingPassword) return res.status(401).json({ message: 'Credenciales incorrectas.' });
            const payload = { id: user._id };
            const token = jwt.sign(payload, JWT_SECRET)
            return res.status(200).json({ id: user._id, token: token })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    },
    get: async (req, res) => {
        try {
            const { token } = req.headers
            const { userID } = req.params
            if (userID != jwt.verify(token, JWT_SECRET).id) {
                return res.status(403).json({ message: "No autorizado" });
            }
            const user = await User.findById(userID)
            if (!user) {
                return res.status(400).json({ message: "Usuario no encontrado" });
            }
            return res.status(200).json({ name: user.name, email: decrypt(user.email) })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    },
    update: async (req, res) => {
        try {
            const { token } = req.headers
            const { name, email, password } = req.body
            const { userID } = req.params
            if (userID != jwt.verify(token, JWT_SECRET).id) {
                return res.status(403).json({ message: "No autorizado" });
            }
            const updateFields = {};
            if (name) updateFields.name = name;
            if (email) updateFields.email = email;
            if (password) updateFields.password = password;
            const updatedUser = await User.findByIdAndUpdate(userID, updateFields)
            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.status(200).json({ message: "Usuario actualizado exitosamente" });
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    },
    delete: async (req, res) => {
        try {
            const { token } = req.headers
            const { userID } = req.params
            if (userID != jwt.verify(token, JWT_SECRET).id) {
                return res.status(403).json({ message: "No autorizado" });
            }
            const deletedUser = await User.findByIdAndDelete(userID)
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.status(200).json({ message: "Usuario eliminado exitosamente" });
        } catch (e) {
            console.log(e);
            console.error(e)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}

module.exports = { userController }
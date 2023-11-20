const { Router } = require('express')
const { userController } = require('../controllers/userController')
const { eventController } = require('../controllers/eventController')
const { categoryController } = require('../controllers/categoryController')
const { noteController } = require('../controllers/noteController')

const router = Router()

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registro de usuario
 *     description: Crea un nuevo usuario con nombre, correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       409:
 *         description: El usuario ya existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/signup", userController.signup)

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Inicio de sesión
 *     description: Inicia sesión con correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve un token de acceso.
 *       401:
 *         description: Credenciales incorrectas o usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/signin", userController.signin)

/**
 * @swagger
 * /update/user/{userID}:
 *   put:
 *     summary: Actualización de usuario
 *     description: Actualiza la información del usuario identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       403:
 *         description: No autorizado para actualizar este usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/update/user/{userID}", userController.update)

/**
 * @swagger
 * /delete/user/{userID}:
 *   delete:
 *     summary: Eliminación de usuario
 *     description: Elimina el usuario identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       403:
 *         description: No autorizado para eliminar este usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete/user/{userID}", userController.delete)

router.post("/create/event", eventController.createEvent)
router.delete("/delete/event/:eventId", eventController.deleteEvent)
router.get("/get/events/:userId", eventController.getEventsByUser)
router.put("/update/event/:eventId", eventController.updateEvent)

router.post("/create/category", categoryController.createCategory)
router.delete("/delete/category/:categoryId", categoryController.deleteCategory)
router.get("/get/categories/:userId", categoryController.getCategoriesByUser)
router.put("/update/category/:categoryId", categoryController.updateCategory)

router.post("/create/note", noteController.createNote)
router.delete("/delete/note/:noteId", noteController.deleteNote)
router.get("/get/notes/:eventId", noteController.getNotesByEvent)
router.put("/update/note/:noteId", noteController.updateNote)

module.exports = { router }
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
 *     tags: [User]
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
 *     tags: [User]
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
 *     tags: [User]
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
 *     tags: [User]
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

/**
 * @swagger
 * /create/event:
 *   post:
 *     summary: Crea un nuevo evento.
 *     description: Crea un nuevo evento con la información proporcionada.
 *     tags: [Event]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Información del evento a crear.
 *         schema:
 *           type: object
 *           properties:
 *             startDateTime:
 *               type: string
 *               format: date-time
 *               description: Fecha y hora de inicio del evento.
 *             endDateTime:
 *               type: string
 *               format: date-time
 *               description: Fecha y hora de finalización del evento.
 *             title:
 *               type: string
 *               description: Título del evento.
 *             description:
 *               type: string
 *               description: Descripción del evento.
 *             categories:
 *               type: array
 *               items:
 *                 type: string
 *               description: Categorías asociadas al evento.
 *     responses:
 *       201:
 *         description: Evento creado exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/create/event", eventController.createEvent)

/**
 * @swagger
 * /delete/event/{eventId}:
 *   delete:
 *     summary: Elimina un evento existente.
 *     description: Elimina el evento con el ID proporcionado.
 *     tags: [Event]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID del evento a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete/event/:eventId", eventController.deleteEvent)

/**
 * @swagger
 * /get/events/{userId}:
 *   get:
 *     summary: Obtiene todos los eventos de un usuario.
 *     description: Obtiene todos los eventos asociados al ID de usuario proporcionado.
 *     tags: [Event]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario para obtener sus eventos.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/events/:userId", eventController.getEventsByUser)

/**
 * @swagger
 * /update/event/{eventId}:
 *   put:
 *     summary: Actualiza un evento existente.
 *     description: Actualiza la información de un evento con el ID proporcionado.
 *     tags: [Event]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID del evento a actualizar.
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Nueva información para el evento.
 *         schema:
 *           type: object
 *           properties:
 *             startDateTime:
 *               type: string
 *               format: date-time
 *               description: Nueva fecha y hora de inicio del evento.
 *             endDateTime:
 *               type: string
 *               format: date-time
 *               description: Nueva fecha y hora de finalización del evento.
 *             title:
 *               type: string
 *               description: Nuevo título del evento.
 *             description:
 *               type: string
 *               description: Nueva descripción del evento.
 *             categories:
 *               type: array
 *               items:
 *                 type: string
 *               description: Nuevas categorías asociadas al evento.
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/update/event/:eventId", eventController.updateEvent)


/**
 * @swagger
 * /create/category:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               color:
 *                 type: string
 *                 description: Color asociado a la categoría
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/create/category", categoryController.createCategory)

/**
 * @swagger
 * /delete/category/{categoryId}:
 *   delete:
 *     summary: Elimina una categoría existente
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/delete/category/:categoryId", categoryController.deleteCategory)

/**
 * @swagger
 * /get/categories/{userId}:
 *   get:
 *     summary: Obtiene todas las categorías asociadas a un usuario
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario cuyas categorías se quieren obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/get/categories/:userId", categoryController.getCategoriesByUser)

/**
 * @swagger
 * /update/category/{categoryId}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID de la categoría a actualizar
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
 *                 description: Nuevo nombre de la categoría
 *               color:
 *                 type: string
 *                 description: Nuevo color asociado a la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/update/category/:categoryId", categoryController.updateCategory)

/**
 * @swagger
 * /create/note:
 *   post:
 *     summary: Crea una nueva nota
 *     description: Crea una nueva nota asociada a un evento. Requiere un token de autenticación en la cabecera.
 *     tags: [Note]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos de la nueva nota (title, body, eventId).
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             body:
 *               type: string
 *             eventId:
 *               type: string
 *     responses:
 *       201:
 *         description: Nota creada exitosamente.
 *       404:
 *         description: Evento no encontrado.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/create/note", noteController.createNote)

/**
 * @swagger
 * /delete/note/{noteId}:
 *   delete:
 *     summary: Elimina una nota existente
 *     description: Elimina una nota existente asociada a un evento. Requiere un token de autenticación en la cabecera.
 *     tags: [Note]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID de la nota a eliminar.
 *     responses:
 *       200:
 *         description: Nota eliminada exitosamente.
 *       404:
 *         description: Nota o evento no encontrados.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete/note/:noteId", noteController.deleteNote)

/**
 * @swagger
 * /get/notes/{eventId}:
 *   get:
 *     summary: Obtiene todas las notas de un evento
 *     description: Obtiene todas las notas asociadas a un evento. Requiere un token de autenticación en la cabecera.
 *     tags: [Note]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID del evento del que se quieren obtener las notas.
 *     responses:
 *       200:
 *         description: Notas obtenidas exitosamente.
 *       404:
 *         description: Evento no encontrado.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/notes/:eventId", noteController.getNotesByEvent)

/**
 * @swagger
 * /update/note/{noteId}:
 *   put:
 *     summary: Actualiza una nota existente
 *     description: Actualiza una nota existente asociada a un evento. Requiere un token de autenticación en la cabecera.
 *     tags: [Note]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID de la nota a actualizar.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Nuevos datos de la nota (title, body).
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             body:
 *               type: string
 *     responses:
 *       200:
 *         description: Nota actualizada exitosamente.
 *       404:
 *         description: Nota o evento no encontrados.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/update/note/:noteId", noteController.updateNote)

module.exports = { router }
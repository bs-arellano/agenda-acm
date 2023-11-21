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
 *     summary: Registra un nuevo usuario.
 *     description: Registra un nuevo usuario con la información proporcionada.
 *     tags: [User]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Información del usuario a registrar.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nombre del usuario.
 *             email:
 *               type: string
 *               description: Correo electrónico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña del usuario.
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
 *     summary: Inicia sesión de un usuario.
 *     description: Inicia sesión de un usuario con las credenciales proporcionadas.
 *     tags: [User]
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Credenciales del usuario para iniciar sesión.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Correo electrónico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve el ID del usuario y un token.
 *       401:
 *         description: Usuario no encontrado o credenciales incorrectas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/signin", userController.signin)

/**
 * @swagger
 * /update/user/{userID}:
 *   put:
 *     summary: Actualiza la información de un usuario.
 *     description: Actualiza la información de un usuario identificado por su ID.
 *     tags: [User]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: userID
 *         in: path
 *         required: true
 *         description: ID del usuario a actualizar.
 *       - name: body
 *         in: body
 *         required: true
 *         description: Nueva información del usuario.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nuevo nombre del usuario.
 *             email:
 *               type: string
 *               description: Nuevo correo electrónico del usuario.
 *             password:
 *               type: string
 *               description: Nueva contraseña del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/update/user/:userID", userController.update)

/**
 * @swagger
 * /get/user/{userID}:
 *   get:
 *     summary: Obtiene información de un usuario.
 *     description: Obtiene información detallada de un usuario.
 *     tags: [User]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: userID
 *         in: path
 *         required: true
 *         description: ID del usuario cuya información se desea obtener.
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente.
 *       403:
 *         description: No autorizado para acceder a la información del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/user/:userID", userController.get)

/**
 * @swagger
 * /delete/user/{userID}:
 *   delete:
 *     summary: Elimina un usuario.
 *     description: Elimina un usuario identificado por su ID.
 *     tags: [User]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: userID
 *         in: path
 *         required: true
 *         description: ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete/user/userID", userController.delete)

/**
 * @swagger
 * /create/event:
 *   post:
 *     summary: Crea un nuevo evento.
 *     description: Crea un nuevo evento con la información proporcionada.
 *     tags: [Event]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
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
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
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
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
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
 * /get/event/{eventId}:
 *   get:
 *     summary: Obtiene un evento por su ID.
 *     description: Obtiene la información detallada de un evento según su ID.
 *     tags: [Event]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID del evento a obtener.
 *         schema:
 *           type: string
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *     responses:
 *       200:
 *         description: Información del evento obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del evento.
 *                 startDateTime:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de inicio del evento.
 *                 endDateTime:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de finalización del evento.
 *                 title:
 *                   type: string
 *                   description: Título del evento.
 *                 description:
 *                   type: string
 *                   description: Descripción del evento.
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Categorías asociadas al evento.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/event/:eventId", eventController.getEventById)

/**
 * @swagger
 * /update/event/{eventId}:
 *   put:
 *     summary: Actualiza un evento existente.
 *     description: Actualiza la información de un evento con el ID proporcionado.
 *     tags: [Event]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
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
 *     summary: Crea una nueva categoría.
 *     description: Crea una nueva categoría con la información proporcionada.
 *     tags: [Category]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: body
 *         in: body
 *         required: true
 *         description: Información de la categoría a crear.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nombre de la categoría.
 *             color:
 *               type: string
 *               description: Color asociado a la categoría.
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/create/category", categoryController.createCategory)

/**
 * @swagger
 * /delete/category/{categoryId}:
 *   delete:
 *     summary: Elimina una categoría.
 *     description: Elimina la categoría con el ID proporcionado.
 *     tags: [Category]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID de la categoría a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete/category/:categoryId", categoryController.deleteCategory)

/**
 * @swagger
 * /get/categories/{userId}:
 *   get:
 *     summary: Obtiene las categorías de un usuario.
 *     description: Obtiene las categorías asociadas al usuario con el ID proporcionado.
 *     tags: [Category]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario para obtener sus categorías.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categorías obtenidas exitosamente.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/categories/:userId", categoryController.getCategoriesByUser)

/**
 * @swagger
 * /get/category/{categoryId}:
 *   get:
 *     summary: Obtiene una categoria por su ID.
 *     description: Obtiene la información detallada de una categoria según su ID.
 *     tags: [Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID de la categoria a obtener.
 *         schema:
 *           type: string
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *     responses:
 *       200:
 *         description: Información de la categoria obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Nuevo nombre de la categoría.
 *                  color:
 *                      type: string
 *                      description: Nuevo color asociado a la categoría.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Evento no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/category/:categoryId", categoryController.getCategoryById)

/**
 * @swagger
 * /update/category/{categoryId}:
 *   put:
 *     summary: Actualiza una categoría.
 *     description: Actualiza la categoría con el ID proporcionado.
 *     tags: [Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID de la categoría a actualizar.
 *         schema:
 *           type: string
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *       - name: body
 *         in: body
 *         required: true
 *         description: Nueva información de la categoría.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nuevo nombre de la categoría.
 *             color:
 *               type: string
 *               description: Nuevo color asociado a la categoría.
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error interno del servidor.
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
 * /get/note/{noteId}:
 *   get:
 *     summary: Obtiene todas las notas de un evento
 *     description: Obtiene todas las notas asociadas a un evento. Requiere un token de autenticación en la cabecera.
 *     tags: [Note]
 *     parameters:
 *       - name: noteId
 *         in: path
 *         required: true
 *         description: ID de la nota a obtener.
 *         schema:
 *           type: string
 *       - name: token
 *         in: header
 *         required: true
 *         description: Token de autenticación del usuario.
 *     responses:
 *       200:
 *         description: Información de la nota obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Título de la nota.
 *                 content:
 *                   type: string
 *                   description: Contenido de la nota.
 *                 event:
 *                   type: string
 *                   description: ID del evento asociado a la nota.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Nota no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get/note/:noteId", noteController.getNotesById)

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
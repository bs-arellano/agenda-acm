const express = require('express')
const mongoose = require('mongoose');

const { router } = require('./router/router')
const { HOST, PORT, DB_URI } = require('./configs/constants')

//DATABASE
console.log(DB_URI);
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to:", DB_URI);
});

//SERVER
const app = express()

app.use(express.json());

//Middleware
app.use((req, res, next) => {
    console.log(`Solicitud ${req.method} recibida en ${req.url}`)
    next()
})
//Routes
app.use(router)
//Start listening
app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}/`)
})
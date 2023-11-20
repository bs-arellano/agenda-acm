if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ path: __dirname + '/.env' })
}

const HOST = process.env.HOST
const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PSWD = process.env.DB_PSWD
const DB_URI = process.env.NODE_ENV === 'production' ? `mongodb://${DB_USER}:${DB_PSWD}@${DB_HOST}:${DB_PORT}/agenda` : `mongodb://${DB_HOST}:${DB_PORT}/agenda`
const JWT_SECRET = process.env.JWT_SECRET
const DB_ENCRYPTION_KEY = process.env.DB_ENCRYPTION_KEY

module.exports = { HOST, PORT, DB_URI, JWT_SECRET, DB_ENCRYPTION_KEY }
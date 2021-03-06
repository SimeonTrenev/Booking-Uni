const formValidator = require('./formValidator')
const jwt = require('./jwt')
const authMiddleware = require('./authMiddleware')
const isAuthNeededMiddleware = require('./isAuthNeededMiddleware')
const loginMiddleware = require('./loginMiddleware')
const registerMiddleware = require('./registerMiddleware')
const hotelValidation = require('./hotelValidation')
const errorHandler = require('./errorHandler')

module.exports = {
    formValidator,
    jwt,
    authMiddleware,
    isAuthNeededMiddleware,
    loginMiddleware,
    registerMiddleware,
    hotelValidation,
    errorHandler


}
const { hotelController } = require('../controllers')
const { isAuthNeededMiddleware  } = require('../utils')
// const { hotelValidation } = require('../utils')

module.exports = (router) => {

    router.get('/all', isAuthNeededMiddleware(),  hotelController.get.all)
    router.get('/create', isAuthNeededMiddleware(), hotelController.get.create)
    router.get('/edit/:hotelId', isAuthNeededMiddleware(), hotelController.get.edit)
    router.get('/details/:hotelId', isAuthNeededMiddleware(), hotelController.get.details)
    router.get('/delete/:hotelId', isAuthNeededMiddleware(), hotelController.get.delete)
  

    router.post('/create', isAuthNeededMiddleware(), hotelController.post.create)
    router.post('/edit/:hotelId', isAuthNeededMiddleware(), hotelController.post.edit)

    return router
}
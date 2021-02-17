const { hotelController } = require('../controllers')
// const { isAuthNeededMiddleware  } = require('../utils')

module.exports = (router) => {

    router.get('/all',  hotelController.get.all)
    router.get('/create',  hotelController.get.create)
    router.get('/edit/:hotelId',  hotelController.get.edit)
    router.get('/details/:hotelId',  hotelController.get.details)
    router.get('/delete/:hotelId',  hotelController.get.delete)

    router.post('/create',  hotelController.post.create)
    router.post('/edit/:hotelId', hotelController.post.edit)

    return router
}
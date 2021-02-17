const { body } = require('express-validator');


module.exports = [
    body('hotel', 'The hotel name must be at least 4 characters!').isLength({ min: 4}),
    body('city', 'The city must be at least 3 characters').isLength({ min: 3 }),
    // body('imageUrl', 'The image url must starts with http or https!').if(!statsWith('http') || !starsWith('https')),
    body('freeRooms', 'The free rooms should be between 1 and 100').isFloat({min: 1, max: 100})
]
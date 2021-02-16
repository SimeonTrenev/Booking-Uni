const { Hotel } = require('../models');

module.exports = {
    get: {
      all(req, res, next){

        Hotel
        .find({})
        .lean()
        .then(hotels => {
            res.render('./home/home.hbs', {
                hotels
            })
        })
        .catch(err => console.log(err))
      },
        
    }
}
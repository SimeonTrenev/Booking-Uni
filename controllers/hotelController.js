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
      create(req, res, next){
          res.render('./hotels/create.hbs')
      },
      edit(req, res, next) {
          Hotel
          .findOne({ _id: req.params.hotelId })
          .lean()
          .then(hotels => {
              res.render('./hotels/edit.hbs', hotels)
          })
          .catch(err => console.log(err))
      },
      details(req, res, next) {
          Hotel
          .findOne({ _id: req.params.hotelId })
          .lean()
          .then(hotels => {
              res.render('./hotels/details.hbs', { ...hotels })
          })
          .catch(err => console.log(err))
      },
      delete(req, res, next) {
         Hotel.deleteOne({ _id: req.params.hotelId })
            .then(hotels => {
                res.redirect('/hotels/all')
            })
            .catch(err => console.log(err)) 
      }

    },
    post: {
        create(req, res, next){
            Hotel
                .create({ ...req.body, owner: req.user._id })
                .then(createdHotel => {
                    console.log(createdHotel)
                    res.redirect('/hotels/all')
                })
                .catch(err => console.log(err))
        },
        edit(req, res, next) {

        }
    }
}
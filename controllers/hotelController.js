const { Hotel } = require("../models");
const { User } = require('../models')

module.exports = {
  get: {
    all(req, res, next) {
      Hotel.find({})
        .lean()
        .then((hotels) => {
          hotels.sort((a, b) => b.freeRooms - a.freeRooms)
          res.render("./home/home.hbs", {
            hotels,
          });
        })
        .catch((err) => console.log(err));
    },
    create(req, res, next) {
      res.render("./hotels/create.hbs");
    },
    edit(req, res, next) {
      Hotel.findOne({ _id: req.params.hotelId })
        .lean()
        .then((hotels) => {
          res.render("./hotels/edit.hbs", hotels);
        })
        .catch((err) => console.log(err));
    },
    details(req, res, next) {
      Hotel.findOne({ _id: req.params.hotelId })
        .lean()
        .then((hotels) => {
          res.render("./hotels/details.hbs", { ...hotels });
        })
        .catch((err) => console.log(err));
    },
    delete(req, res, next) {
      Hotel.deleteOne({ _id: req.params.hotelId })
        .then((hotels) => {
          res.redirect("/hotels/all");
        })
        .catch((err) => console.log(err));
    },
    book(req, res, next) {
        const { username, hotelId } = req.params
    
        User
            .findOne({username})
            .then(currentUser => {
                currentUser.bookedHotels.push(hotelId)
                currentUser.save()
                res.redirect(`/hotels/details/${hotelId}`)
            })
            .catch(err => console.log(err));

    //    Hotel
    //         .findOne({hotelId})
    //         .then(currentHotel => {
    //             currentHotel.userBooked.push(username)
    //             currentHotel.save()
                
    //         })

        
        
    }
    
  },
  post: {
    
    create(req, res, next) {
      if (req.body.freeRooms > 0 && req.body.freeRooms <= 100 && req.body.hotel.length > 3 && req.body.city.length > 2 && (req.body.imageUrl.startsWith('http') || req.body.imageUrl.startsWith('https'))) {
        Hotel.create({ ...req.body, owner: req.user._id })
          .then((createdHotel) => {
            console.log(createdHotel);
            res.redirect("/hotels/all");
          })
          .catch((err) => console.log(err));
      }else{
          res.redirect('/hotels/create')
      }
    },
    edit(req, res, next) {
      const { hotelId } = req.params;

      if(req.body.freeRooms > 0 && req.body.freeRooms <= 100 && req.body.hotel.length > 3 && req.body.city.length > 2 && (req.body.imageUrl.startsWith('http') || req.body.imageUrl.startsWith('https'))){

      Hotel.updateOne({ _id: hotelId }, { $set: { ...req.body } })
        .then((updatedHotel) => {
          res.redirect(`/hotels/details/${hotelId}`);
        })
        .catch((err) => console.log(err));

    }else{
        res.redirect(`/hotels/edit/${hotelId}`)
    }
    },
  },
};

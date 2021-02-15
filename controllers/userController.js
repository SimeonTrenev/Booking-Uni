const { User } = require('../models')
const { cookie } = require('../config')
const { formValidator } = require('../utils')

module.exports = {
    get: {
        login(req, res, next){
            res.render('./user/login.hbs')
        },
        register(req, res, next){
            res.render('./user/register.hbs')
        },
        profile(req, res, next){
            res.render('./user/profile.hbs')
        },
        logout(req, res, next){
            res
            .clearCookie(cookie)
            .redirect('/home')
        }

    },
    post: {
        register(req, res, next){
            const formValidations = formValidator(req)

            if(!formValidations.isOk){
                res.render('./user/register.hbs', formValidations.contextOptions);
                return
            }

            const { email, username, password } = req.body;

            User.findOne({ email })
                .then(user => {
                    if(user){
                        throw new Error('The given email is already in use !')
                    }
                });

            User.findOne({ username })
                .then(user => {
                    if(user){
                        throw new Error('The given username is already in use!')
                    }
                  return User.create({ email, username, password })  
                })
                .then(createdUser => {
                    res.redirect('/user/login')
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/user/register')
                })
        }
    }
}
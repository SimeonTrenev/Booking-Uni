const { User } = require('../models')
const { cookie } = require('../config')
const { formValidator, jwt } = require('../utils')

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
        },
        login(req, res, next) {
        const formValidations = formValidator(req);

        if(!formValidations.isOk){
            res.render('./user/login.hbs', formValidations.contextOptions)
            return;
        }

        const { username, password } = req.body;

        User.findOne({ username })
            .then(user => {
                return Promise.all([ user.comparePasswords(password), user ])
            })
            .then(([ isPasswordMatched, user ]) => {
                if(!isPasswordMatched){
                    throw new Error('The passwords does not matched.')
                }

                const token = jwt.createToken(user._id);

                res
                .status(200)
                .cookie(cookie, token, { maxAge: 3600000 })
                .redirect('/home')
            })
            .catch(err => console.log(err))
        }
    }
}
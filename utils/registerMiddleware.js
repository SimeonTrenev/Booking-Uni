const { body } = require('express-validator');

module.exports = [
    body('email', 'The provided email is not valid!').isEmail(),
    body('username','Your username should consist only english letters and digits!').matches(/^[A-Za-z0-9]+$/),
    body('password','Your username should consist only english letters and digits!').matches(/^[A-Za-z0-9]+$/),
    body('password', 'Your password should be at least 5 digits!').isLength({ min: 5 }),
    body('repeatPassword').custom(passwordCheck)
]

function passwordCheck(repeatPassword, { req }){
    if(repeatPassword !== req.body.password){
        throw new Error('Passwords does not match!')
    }

    return true
}
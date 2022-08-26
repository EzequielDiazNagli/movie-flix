const Router = require('express').Router(); 
// const validatorSignUp = require('../config/validatorSignUp')
// const passport = require('../config/passport')
const { signUpUser, signInUser, verifyEmail, checkToken, modifyUser  } = require('../controllers/userControlllers')

Router.route('/auth/register')
.post(validatorSignUp, signUpUser)

Router.route('/login')
.post(signInUser)

Router.route('/verify/:string')
.get(verifyEmail)

Router.route('/singInToken')
.get(passport.authenticate('jwt', {session: false}), checkToken)




module.exports = Router
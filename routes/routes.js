const Router = require('express').Router(); 
const validatorRegister = require('../config/validatorRegister')
const passport = require('../config/passport')
const { registerUser, loginUser, verifyEmail, checkToken, pushFav} = require('../controllers/userController')

Router.route('/register')
.post(validatorRegister, registerUser)

Router.route('/login')
.post(loginUser)

Router.route('/verify/:string')
.get(verifyEmail)

Router.route('/logintoken')
.get(passport.authenticate('jwt', {session: false}), checkToken)

Router.route('/pushfav')
.put(passport.authenticate('jwt', {session: false}), pushFav)



module.exports = Router
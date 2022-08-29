const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken')

const userControllers = {

    registerUser: async (req, res) => {
        const {
            name,
            lastName,
            password,
            email,
            from
        } = req.body.userData

        try {
            const newUser = await User.findOne({email}) //buscamos por mail
            const hashWord = bcryptjs.hashSync(password, 10) //hasheo la contraseña
            const verification = false //por default
            const uniqueString = crypto.randomBytes(15).toString('hex') //metodos de crypto
            if (!newUser) { //si NO existe el usuario
                const myNewUser = await new User({name, lastName, email, verification,
                    uniqueString: uniqueString,
                    password: [hashWord],
                    from: [from]
                })
                if (from === "registerForm") { 
                    await myNewUser.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        message: `check ${email} and finish your SIGN UP!`
                    })
                } else { //si la data viene de una red social
                    myNewUser.verification = true
                    await myNewUser.save()
                    res.json({
                        success: true,
                        from: from,
                        message: `you sign up by ${from}! now LOG IN!`
                    })
                }
            } else { //si existe el usuario, significa que al menos tiene un registro
                //hay que chequear si coincide la forma de RE-REGISTRO con la ya REGISTRADA
                //si coincide se tiene que cumplir la siquiente condicion:
                if (newUser.from.indexOf(from) !== -1) { //coincide la forma de registro ACTUAL con alguna ya EXISTENTE en mi bd
                    res.json({ //devolvemos la respuesta
                        success: false,
                        from: from,
                        message: `${email} has been registered, please LOG IN!`
                    })
                    //si no coincide, se tiene que cumplir esta otra:                
                } else {
                    //si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA (nuevo registro con google)
                    //pero ya tiene AL MENOS UN registro (facebook y form)
                    const hashWord = bcryptjs.hashSync(password, 10)
                    newUser.password.push(hashWord)
                    newUser.from.push(from)
                    newUser.verification = true
                    await newUser.save()
                    res.json({
                        success: true,
                        from: from,
                        message: `You've just signed up by ${from}! now LOG IN!`
                    })
                }
            }
        } catch (error) {
            res.json({
                success: false,
                from: from,
                message: 'ERROR'
            })
        }
    },

    loginUser: async (req, res) => {
        const {
            email,
            password,
            from
        } = req.body.loggedUser
        try {
            const loginUser = await User.findOne({email}) 
            if (!loginUser) { 
                res.json({
                    success: false,
                    from: 'no from',
                    message: `${email} has no account, please SIGN UP!`
                })
            } else { //si existe el usuario
                let checkedWord = loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                if (checkedWord.length === 0) {
                    res.json({
                        success: false,
                        from: from,
                        message: `verify your mail or password!`
                    })
                    return
                }
                if (from === "registerForm") { //si fue registrado por nuestro formulario
                    if(loginUser.verification){
                        const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                            id: loginUser._id,
                            email: loginUser.email,
                            name: loginUser.name,
                            lastName: loginUser.lastName,
                            from: loginUser.from
                        }
                        await loginUser.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                        res.json({
                            response: {userData, token},
                            success: true,
                            from: from,
                            message: `Welcome ${userData.name}!`
                        })
                    }else{
                        res.json({
                            success: false,
                            from: from,
                            message: `Please validate your email`
                        })
                    }

                } else { //si fue registrado por redes sociales
                    //ACLARACION: por ahora es igual al anterior
                    //si hay coincidencias
                    const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                        id: loginUser._id,
                        email: loginUser.email,
                        name: loginUser.name,
                        from: loginUser.from
                    }
                    await loginUser.save()
                    const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                    res.json({
                        response: {userData, token},
                        success: true,
                        from: from,
                        message: `Welcome ${userData.name}!`
                    })

                }
            }
        } catch (error) {
            res.json({
                success: false,
                from: from,
                message: 'ERROR'
            })
        }
    },

    verifyEmail: async(req, res) => {

        const {string} = req.params
        const user = await User.findOne({uniqueString: string})
        if(user){
            user.verification = true
            await user.save()
            res.redirect('http://localhost:3000')
        }else{res.json({
            success: false,
            message: 'email has not been confirmed yet'})
        }
    },

    checkToken: (req, res) => {
        if(req.user){
            res.json({
                success: true,
                response: {
                    userData:{
                        id:req.user.id,
                        name:req.user.firstName,
                        lastName: req.user.lastName,
                        email: req.user.email,
                        from: 'token',
                    }
                  
                },
                message: 'Welcome '+req.user.name})
        }else{
            res.json({
                success: false,
                message: 'Por Favor realiza SingIn nuevamente'})
        }
    },

    pushFav: async (req,res) => {
        const idMovie = req.body.idMovies
        const userLogged = req.user
        console.log("idmovie",req.body)
        console.log("userpassport", req.user)
        
        try{
            const user = await User.findOne({_id: userLogged.id})
            console.log("user", user)
            if(user.idMovies.includes(idMovie)){
                User.findOneAndUpdate({_id: userLogged.id}, {$pull: {idMovies:idMovie}}, {new:true})
                .then(newUser => res.json({success:true, message: false, response: newUser.idMovies}))
                .catch((error) => console.log(error))
            }else{
                User.findOneAndUpdate({_id: userLogged.id}, {$push: {idMovies:idMovie}}, {new:true})
                .then(newUser => res.json({success:true, message: false, response: newUser.idMovies}))
                .catch((error) => console.log(error))
            }
        }catch{(error) => res.json({success: false, response: error})}
    },

    getOneUser: async (req, res) => {
        const id = req.user.id
        let user
        let error = null
        try {
            user = await User.findOne({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : user.idMovies,
            success: error ? false : true,
            error: error
        })
    },
}

module.exports = userControllers;
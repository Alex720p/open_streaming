//Will be handling everything linked to accounts etc...

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const { user_model } = require('./models/models.js')


let auth_router = express.Router()

auth_router.post('/login', async (req, res) => {
    if (req.cookies.token) {
        try {
            const token_data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            const user = user_model.findById(token_data.id)

            if (!user || token_data.last_modif != user.last_modif) {
                res.clearCookie('token') //cookie is useless, clear it
                return res.status(400).json({error: 'invalid token'})
            }
            return res.status(200).json({message: 'login successful'})  
               
        } catch(err) {
            res.clearCookie('token') //cookie is not valid, clear it
            return res.status(400).send({error: 'session expired'})
        }
    }

    const user = await user_model.findOne({username: req.body.username})
    if (!user)
        return res.status(400).json({error: 'invalid username and/or password'})

    try { 
        if (!await argon2.verify(user.password, req.body.password))
            return res.status(400).json({error: 'invalid username and/or password'})
    } catch(err) {
        console.log(err)
        return res.status(400).json({error: err})
    }
    
    const token = jwt.sign({
        id: user._id,
        last_modif: user.last_modif
    }, process.env.JWT_SECRET, {expiresIn: '7d'})
    
    res.cookie('token', token, {
        httpOnly: true
    })

    return res.status(200).json({message: 'login successful'})  
})

auth_router.post('/register', async (req, res) => { //add checks for mail + add custom error for duplicate names etc...
    if (!req.body.password || !req.body.username)
        return res.status(400).json({error: 'password and/or username is/are missing'})

    if (req.body.password.length < 8)
        return res.status(400).json({error: 'the length of your password has to be at least 8 characters'})
    
    try {
        let password_hash = await argon2.hash(req.body.password) //default config should be good enough

        const new_user = new user_model({
            mail: req.body.mail,
            username: req.body.username,
            password: password_hash
        }) 

        await new_user.save()
    }
    catch(err) { //todo make unique error messages
        console.log(err)
        return res.status(400).json(err)
    }

    return res.status(200).json({message: 'account created'})
})

module.exports = auth_router

//Will be handling everything linked to accounts etc...

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const { user_model } = require('./models/models.js')


let auth_router = express.Router()


auth_router.post('/login', async (req, res) => {
    //check jwt
})

auth_router.post('/register', async (req, res) => {
    if (!req.body.password || !req.body.username || !req.body.mail)
        return res.status(400).json({error: 'password and/or username and/or email is/are missing'})

    if (req.body.password.length <= 8 || req.body.password.length >= 25)
        return res.status(400).json({error: 'password length has to be between 8 and 25'})
    
    try {
        let password_hash = await argon2.hash(req.body.password) //default config should be good enough

        const new_user = new user_model({
            mail: req.body.mail,
            username: req.body.username,
            password: password_hash
        })

        await new_user.save()
    }
    catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }

    return res.status(200).json({message: 'account created'})
})

module.exports = auth_router
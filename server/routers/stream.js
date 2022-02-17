//custom router for managing streams when the livepeer api isn't needed

const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const {user_model, stream_model} = require('./models/models.js')


let stream_router = express.Router()

stream_router.patch('/', async (req, res) => { //update the stream name on mongo not on livepeer
    if (!req.body.user_id || !req.body.stream_name)
        return res.status(400).json({error: `no user id and/or new stream name is/are specified`})

    try {
        const user = await user_model.findById(req.body.user_id)
        let stream = await stream_model.findById(user.stream)
        stream.name = req.body.stream_name

        await stream.save()
    } catch(err) {
        console.log(err)
        return res.status(400).json({error: 'something went wrong'})
    }

    return res.status(200).json({message: 'stream name updated'})
})


module.exports = stream_router
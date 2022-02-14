//simple wrapper for the livepeer api

const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const {user_model, stream_model} = require('./models/models.js')

let livepeer_router = express.Router()


const req_config = {
    baseURL: 'https://livepeer.com/api/stream',
    headers: {
        'Authorization': `Bearer ${process.env.LIVEPEER_API_KEY}`
    }
}

livepeer_router.post('/', async (req, res) => { //create a stream object for the user
    if (!req.body.user_id)
        return res.status(400).json({error: `no user id is specified`})


    try { //add check user doesn't already have a stream
        const user = await user_model.findById(req.body.user_id)
        if (user.stream != null)
            return res.status(400).json({error: `a stream object already exists for this user`})

        const livepeer_res = await axios.post('/', 
        { //default config from the livepeer api doc
            "name": `${user.username}'s stream`,
            "profiles": [
                {
                "name": "720p",
                "bitrate": 2000000,
                "fps": 30,
                "width": 1280,
                "height": 720
                },
                {
                "name": "480p",
                "bitrate": 1000000,
                "fps": 30,
                "width": 854,
                "height": 480
                },
                {
                "name": "360p",
                "bitrate": 500000,
                "fps": 30,
                "width": 640,
                "height": 360
                }
            ]
        }, req_config) 

        const stream_data = livepeer_res.data

        const new_stream = new stream_model({
            livepeer_id: stream_data.id,
            key: stream_data.streamKey,
            playback_id: stream_data.playbackId,
            stream_name: stream_data.name
        })

        await new_stream.save()

        user.stream = new_stream._id
        await user.save()

    } catch(err) {
        console.log(err)
        return res.status(400).json({error: 'Something went wrong, try again'})
    }


    return res.status(200).json({message: 'Stream created'})
})


module.exports = livepeer_router;
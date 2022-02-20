//simple wrapper for the livepeer api

const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const {user_model, stream_model} = require('./models/models.js')

let livepeer_router = express.Router()


const req_config = {
    baseURL: 'https://livepeer.com/api/stream',
    headers: {
        'Authorization': `Bearer ${process.env.LIVEPEER_API_KEY}`
    }
} //config for requests on the livepeer api

livepeer_router.post('/', async (req, res) => { //create a stream object for the specified user
    let token_data = null    
    if (req.cookies.token) { //could do a middleware but we're only using this here atm, might be worthwile to implement one later
        try {
            token_data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        } catch(err) {
            console.log(err)
            return res.status(400).json({error: 'invalid token'})
        }

    } else {
        return res.status(400).json({error: 'you have to be logged in to create a stream'})
    }

    try {
        let user = await user_model.findById(token_data.id)
        if (user.stream != null)
            return res.status(400).json({error: `a stream object already exists for this user`})

        const livepeer_res = await axios.post('/', 
        { //default config from the livepeer api doc
            "name": user.username,
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
            name: stream_data.name
        })

        await new_stream.save()

        user.stream = new_stream._id
        await user.save()

    } catch(err) {
        console.log(err)
        return res.status(400).json({error: err.response.statusText ? err.response.statusText : 'something went wrong'})
    }


    return res.status(200).json({message: 'stream created'})
})

livepeer_router.get('/stream', async (req, res) => { //get info of a stream with it's id
    if (!req.body.stream_id)
        return res.status(400).json({error: 'no stream id specified'})
    try {
        let livepeer_res = await axios.get(`/${req.body.stream_id}`, req_config)
        console.log(livepeer_res.data)
        return res.status(200).json((({createdAt, playbackId, isActive, lastSeen}) => ({createdAt, playbackId, isActive, lastSeen}))(livepeer_res.data)) //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
    } catch(err) {
        console.log(err)
        return res.status(400).json({error: err.response.statusText ? err.response.statusText : 'something went wrong'})
    }
})

livepeer_router.get('/active_streams', async (req, res) => { //returns all the ids of active streams
    try {
        let livepeer_res = await axios.get('/?streamsonly=1&filters=[{"id": "isActive", "value": true}]', req_config)
        return res.status(200).json(livepeer_res.data.map(({id, playbackId, region}) => ({id, playbackId, region}))) // id being livepeer_id in the models.js, https://stackoverflow.com/questions/56031092/filtering-json-file-so-it-only-has-certain-key-value-pairs
    } catch(err) {
        console.log(err)
        return res.status(400).json({error: err.response.statusText ? err.response.statusText : 'something went wrong'})
    }
})



module.exports = livepeer_router
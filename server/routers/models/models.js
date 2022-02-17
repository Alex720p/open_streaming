//mongo db models
const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    mail: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true, minlength: 3, maxlength: 20},
    password: {type: String, unique: true, required: true},
    creation_date: { type: Date, default: Date.now, required: true },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stream'
    }
})

const stream_schema = new mongoose.Schema({
    livepeer_id: {type: String, required: true}, 
    key: {type: String, required: true},
    playback_id: {type: String, required: true},
    name: {type: String, required: true}
})

const user_model = mongoose.model('user', user_schema)
const stream_model = mongoose.model('stream', stream_schema)

module.exports = { user_model, stream_model }
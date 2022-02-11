//mongo db models
const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    mail: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true, minlength: 3, maxlength: 20},
    password: {type: String, unique: true, required: true},
    creation_date: { type: Date, default: Date.now, required: true }
})

const user_model = mongoose.model('user', user_schema)

module.exports = { user_model }
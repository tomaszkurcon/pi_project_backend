const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    base64:String
})

module.exports = mongoose.model('Image', imageSchema)
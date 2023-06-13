const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attempt = new Schema({
    enteredDigits:{
        type:Number,
        required:true
    },
    mistakes:{
        type:Number,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Attempt', attempt)
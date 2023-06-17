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
    },
    user_id: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    email: {
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Attempt', attempt)
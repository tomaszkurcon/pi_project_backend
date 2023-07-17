// const mongoose = require('mongoose');

// const {Schema, model} = mongoose;

// const refreshTokenSchema = new Schema({
//     owner: {
//         type:Schema.Types.ObjectId,
//         ref:'User',
//         required:true      
//     }
// })

// module.exports = model('RefreshToken', refreshTokenSchema);

const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const refreshTokenSchema = new Schema({
    token: {
        type:String,
        required:true      
    }
})

module.exports = model('RefreshToken', refreshTokenSchema);
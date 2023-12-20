const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type:String
    },
    surname: {
        type:String
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,

})


userSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordTokenExpire = Date.now() + 1000*60*5;
    return resetToken;
}
module.exports = mongoose.model('User', userSchema);
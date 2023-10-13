const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,'User with that email exists']
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});


userSchema.pre('save', async function(next){
    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS)
    this.password = bcrypt.hashSync(this.password, salt)
})



//Export the model
module.exports = mongoose.model('User', userSchema);
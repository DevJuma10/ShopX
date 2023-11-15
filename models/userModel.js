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
        unique:[true,'User with that email exists'],
        lowercase: true
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
    role:{
        type: String,
        enum:['admin', 'user'],
        default:'user'
    },
    active:{
        type: Boolean,
        default: true,
        select: false
    }, 
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart:{
        type: Array,
        default: []
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist: [{ type:  mongoose.Schema.Types.ObjectId, ref: "Product"}],
    refreshToken: {
        type: String
    }
}, 
{ timestamps: true});


userSchema.pre('save', async function(next){
    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS)
    this.password = bcrypt.hashSync(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}



//Export the model
module.exports = mongoose.model('User', userSchema);
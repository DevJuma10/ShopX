const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    brand: {
        type: String,
        enum: ["Lenovo", "Samsung", "Apple"],

    },
    quantity: {
        type: Number
    },
    images: {
        type: Array
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Red"],

    },
    ratings: [
        {
            stars: Number,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    sold:{
        type:Number,
        default:0,
        select: false
    }
}, {timestamps: true});

//Export the model
module.exports = mongoose.model('Product', productSchema);
const { default: mongoose } = require("mongoose")

const dbConnect = async() =>{
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ShopX')
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }

}

module.exports = dbConnect
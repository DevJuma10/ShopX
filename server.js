const express  =  require('express')
const app = express()
const bodyparser = require('body-parser')
const dotenv = require('dotenv').config
const PORT = process.env.PORT || 4000;

const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/authRoute');




dbConnect();

app.use('/', (req, res) => {
    res.send("Hello From The ShopX server side...")
})
















app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})

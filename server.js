const express  =  require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config
const PORT = process.env.PORT || 4000;

const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/authRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dbConnect();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.use('/api/user', authRouter);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler)

app.use('/', (req, res) => {
    res.send("Hello From The ShopX server side...")
})
















app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})

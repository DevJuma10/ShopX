const express  =  require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config
const morgan = require('morgan')
const PORT = process.env.PORT || 4000;

const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute')
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dbConnect();
app.use(morgan('dev'))



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', authRouter);
app.use('/api/products', productRouter);



// Error Handling middlewares
app.use(notFound);
app.use(errorHandler)

app.use('/', (req, res) => {
    res.send("Hello From The ShopX server side...")
})
















app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})

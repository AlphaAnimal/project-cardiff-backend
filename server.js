const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5000

connectDB()

const app = express()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/words', require('./routes/wordRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/scores', require('./routes/scoreRoutes'))




app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
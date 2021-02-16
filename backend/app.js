require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("DB connected")
}).catch(err => console.error(err))

const app = express()

const port = process.env.PORT || 8000

app.listen(port, () => console.log("Real Backend Server is up and running"))
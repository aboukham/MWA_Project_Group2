const express = require('express');


const mongoose = require('mongoose')
const userRouter = require('./routers/userRouter')
var cors = require('cors');
const User = require('./models/Users');

// require('dotenv').config();

const app = express();



app.listen(process.env.PORT,()=> console.log("listening on 4000"));


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/users',userRouter)
mongoose.connect('mongodb://127.0.0.1:27017/HRDB',{useNewUrlParser : true}).then(x=>console.log("connected to DB"));

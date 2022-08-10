const express = require('express');


const mongoose = require('mongoose')
const userRouter = require('./routers/userRouter')
const dashboardRouter = require('./routers/dashboardRouter')
const billRouter = require('./routers/billRouter')
const productRouter = require('./routers/productRouter')
const categoryRouter = require('./routers/categoryRouter')
var cors = require('cors');


require('dotenv').config();

const app = express();



app.listen(process.env.PORT,()=> console.log("listening on 4000"));


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/details',dashboardRouter)
app.use('/users',userRouter)
app.use('/categories',categoryRouter)
app.use('/products',productRouter)
app.use('/bills',billRouter)
mongoose.connect('mongodb://127.0.0.1:27017/HRDB',{useNewUrlParser : true}).then(x=>console.log("connected to DB"));

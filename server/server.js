const express=require('express');
const dotenv=require('dotenv');
const bcrypt=require('bcryptjs');
const User=require('./models/Registration')
const mongoose=require('./config/connection');
const googleAuthRoutes =require('./Authentication/Google_Auth');
const UserRouter=require('./routes/UserRoutes')
const bodyParser = require('body-parser');
dotenv.config();
const app=express();
const PORT=3000;
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', googleAuthRoutes);
app.use('/api/User',UserRouter);


app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})
app.get("/home",(req,res)=>{
    res.send("Welcome Rajan")
})

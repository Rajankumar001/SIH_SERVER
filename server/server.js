const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('./config/connection');
const googleAuthRoutes =require('./Authentication/Google_Auth');
dotenv.config();
const app=express();
const PORT=3000;

app.use('/', googleAuthRoutes);

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})
app.get("/home",(req,res)=>{
    res.send("Welcome Rajan")
})

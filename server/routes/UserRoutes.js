const express=require('express');
const {UserSignup,UserSignin} =require('../controllers/UserController')
const router=express.Router();


// User Signup routes
router.post('/signup', UserSignup);
  
// User Signin routes
router.post('/signin',UserSignin);

module.exports=router;
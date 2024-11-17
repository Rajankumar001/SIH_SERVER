const express=require('express');
const passport=require('passport');
const session=require('express-session')
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const GoogleStrategy=require('passport-google-oauth20').Strategy
const User = require('../models/Registration'); 
dotenv.config();
const router = express.Router();
router.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true
}))
router.use(passport.initialize());
router.use(passport.session());
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/auth/google/callback',
},async(accessToken, refreshToken, profile, done)=>{
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        console.error(err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


router.get("/",(req,res)=>{
    res.send("<a href='/auth/google'>Login with google</a>");
})

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/"}),(req,res)=>{
    res.redirect('/profile');
})

router.get("/profile",(req,res)=>{
    if (req.isAuthenticated()) {
        res.send(`<div>Welcome ${req.user.displayName} 
            <img src={${req.user.photo}}></img>
            </div>`);
    } else {
        res.redirect('/');
    }

})
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})

module.exports=router;
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const registerSchema = new mongoose.Schema({
        googleId: {
            type: String,
            unique: true,
            sparse: true, 
        },
        displayName: {
            type: String,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
        },
        confirmPassword: {
            type: String,
            required: function () {
                return !this.googleId; 
            },
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords don't match",
            },
        },
        photo: {
            type: String, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        firstName: {
            type: String,
            required: function () {
                return !this.googleId; 
            },
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: function () {
                return !this.googleId; 
            },
        },
        DOB: {
            type: Date,
            required: function () {
                return !this.googleId; 
            },
        },
        address: {
            type: String,
            required: function () {
                return !this.googleId; 
            },
        },
        pincode: {
            type: String,
            required: function () {
                return !this.googleId; 
            },
        },
        image: {
            type: String, 
        },
        governmentIdProof: {
            type: String, 
            required: function () {
                return !this.googleId; 
            },
        },
    });
    registerSchema.pre("save",async function(next){
        if(this.isModified('Password')){
            try{
            this.password= await bcrypt.hash(this.password,10);    
        }
        catch(e){
             console.log("error hashing password",e);
        }
    }
        next();
    })
    

const User = mongoose.model('register', registerSchema);
module.exports = User;

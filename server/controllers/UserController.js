const bcrypt = require('bcryptjs');
const User = require('../models/Registration');
//  Register ---------------------------------------------------------------->
const UserSignup = async (req, res) => {
    try {
        const {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          DOB,
          address,
          pincode,
          image,
          governmentIdProof,
        } = req.body;
    
        // Validate input fields
        if (!email || !password || !confirmPassword || !firstName || !lastName || !DOB || !address || !pincode || !governmentIdProof) {
          return res.status(400).send({
            success: false,
            message: "All required fields must be filled.",
          });
        }
        if (password !== confirmPassword) {
          return res.status(400).send({
            success: false,
            message: "Passwords do not match.",
          });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).send({
            success: false,
            message: "User already registered.",
          });
        }
    
        // Create a new user
        const newUser = new User({
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          DOB,
          address,
          pincode,
          image,
          governmentIdProof,
        });
    
        // Save user to database
        await newUser.save();
    
        res.status(201).send({
          success: true,
          message: "User registration successful.",
        });
      } catch (err) {
        console.error("Error during registration:", err.message); 
        res.status(500).send({
          success: false,
          message: "Error during registration",
        });
      }
    
};
  // Login--------------------------------------------->
  const UserSignin = async (req, res) => {
    try {
        const { email, password, googleId } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required',
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        if (googleId) {
            if (user.googleId !== googleId) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid Google ID',
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Login successful via Google',
            
            });
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Password is required for standard login',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error in UserSignin:', error);
        res.status(500).send({
            success: false,
            message: 'Error during login',
        });
    }
};
module.exports={UserSignup,UserSignin};
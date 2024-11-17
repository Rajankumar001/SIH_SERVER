const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


mongoose.connect(
   `${process.env.MONGO_URL}`
).then(()=>{
    console.log("mongoDB connected.... successfully")
}).catch((err)=>{
    console.log("Error caught..",err);
})

module.exports=mongoose;
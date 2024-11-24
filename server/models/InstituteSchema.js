const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  landDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Land" },
  facultyDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  libraryDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Library" },
}, { timestamps: true });

module.exports = mongoose.model("Institute", InstituteSchema);

const LandSchema = new mongoose.Schema({
    available: { type: Boolean, required: true },
    locationClassification: { 
      type: String, 
      enum: ["Mega & Metro", "Urban", "Hilly areas", "Rural areas"], 
      required: true 
    },
    totalArea: { type: Number, required: true }, // in acres
    buildingDetails: {
      builtUpArea: { type: Number, required: true }, // in sqm
      carpetArea: { type: Number, required: true }, // in sqm
      privateLeaseBuilding: { type: Boolean, required: true },
      numberOfFloors: { type: Number, required: true },
      fireExits: { type: Number, required: true },
      classrooms: {
        perFloor: { type: Number, required: true },
        studentCapacity: { type: Number, required: true },
        smartBoardAvailable: { type: Boolean, required: true },
      },
      staffRooms: {
        perFloor: { type: Number, required: true },
        capacity: { type: Number, required: true },
      },
      elevators: {
        count: { type: Number, required: true },
        capacity: { type: Number, required: true },
      },
    },
    miscellaneous: {
      routesForDisabled: { type: Boolean, required: true },
      controlRoom: { type: Boolean, required: true },
      electricityGenerator: { type: String, required: true }, // e.g., 50-150 kVA
      internet: { 
        speed: { type: String, required: true }, // e.g., "50-100 Mbps"
        type: { type: String, required: true }, // e.g., "Fiber Optic"
      },
      hostel: {
        numberOfHostels: { type: Number, required: true },
        capacity: { type: Number, required: true },
      },
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Land", LandSchema);
  
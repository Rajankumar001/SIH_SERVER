const facultySchema = new mongoose.Schema({
    intake: { type: Number, required: true }, 
    professorCount: { type: Number, required: true },
    associateProfessorCount: { type: Number, required: true },
    assistantProfessorCount: { type: Number, required: true },
    departmentWiseAllocation: {
      professors: { type: Number, required: true },
      associateProfessors: { type: Number, required: true },
      assistantProfessors: { type: Number, required: true },
    },
    qualifications: {
      professor: {
        academic: { type: String, required: true },
        experience: { type: String, required: true },
      },
      associateProfessor: {
        academic: { type: String, required: true },
        experience: { type: String, required: true },
      },
      assistantProfessor: {
        academic: { type: String, required: true },
        experience: { type: String, required: true },
      },
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Faculty", facultySchema);
  
const librarySchema = new mongoose.Schema({
    totalArea: { type: Number, required: true }, // in sqm
    readingRoomArea: { type: Number, required: true }, // in sqm
    bookshelfArea: { type: Number, required: true }, // in linear meters
    computerAccess: { type: Number, required: true }, //
    managementSystem: { type: String, required: true }, 
    booksAndJournals: {
      totalBooks: { type: Number, required: true },
      totalTitles: { type: Number, required: true },
      internationalJournals: { type: Number, required: true },
      researchPapers: { type: Number, required: true },
    },
    seatingCapacity: {
      totalSeats: { type: Number, required: true },
      groupStudyArea: { type: Number, required: true },
    },
    digitalResources: { type: String, required: true }, 
    thesisProjects: { type: String, required: true },
    otherFacilities: {
      libraryTimings: { type: String, required: true }, 
      onlinePortal: { type: Boolean, required: true },
      audioVisualSection: { type: Boolean, required: true },
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Library", librarySchema);
  
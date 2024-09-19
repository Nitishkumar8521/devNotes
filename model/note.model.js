import mongoose from "mongoose"; // Importing mongoose for creating the schema and interacting with MongoDB

// Defining the schema for a note
const noteSchema = new mongoose.Schema(
  {
    // Title of the note, required field
    title: { type: String, required: true },
    
    // Content of the note, required field
    content: { type: String, required: true },
    
    // Status of the note (e.g., completed or not), stored as a boolean, required field
    status: { type: Boolean, required: true },
    
    // Reference to the user who created the note
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId that references the User model
      ref: "User", // Refers to the "User" model
      required: true, // Ensures that the userId is always provided
    },
  },
  {
    versionKey: false, // Disables the __v field that tracks schema versioning in MongoDB
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Creating a model called 'Note' from the schema
const NoteModel = mongoose.model("Note", noteSchema);

export { NoteModel }; // Exporting the NoteModel for use in other parts of the application

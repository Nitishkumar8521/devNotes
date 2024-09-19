import express from "express"; // Importing express to create the router and handle routes
import { NoteModel } from "../model/note.model.js"; // Importing the Note model to interact with the MongoDB collection

const noteRouter = express.Router(); // Creating a router to define note-related routes

// Route to create a new note
noteRouter.post("/create", async (req, res) => {
  const { title, content, status } = req.body; // Extracting title, content, and status from the request body
  const userId = req.user._id; // Getting the user's ID from the request object (assuming the user is already authenticated)
  try {
    const note = new NoteModel({
      title,
      content,
      status,
      userId, // Storing the userId with the note to associate it with a user
    });
    await note.save(); // Saving the new note to the database
    res.status(201).json({ message: "Note created successfully" }); // Sending success response after note creation
  } catch (error) {
    res.status(500).json({ message: `Error while creating note ${error}` }); // Sending error response if note creation fails
  }
});

// Route to fetch all notes of a logged-in user
noteRouter.get("/", async (req, res) => {
  const userId = req.user._id; // Getting the user's ID from the request object
  try {
    const notes = await NoteModel.find({ userId }); // Fetching all notes that belong to the user
    res.status(200).json({ notes }); // Sending the fetched notes in the response
  } catch (error) {
    res.status(500).json({ message: `Error while fetching note ${error}` }); // Sending error response if fetching notes fails
  }
});

// Route to update a specific note by its ID
noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body; // Extracting the updated note data from the request body
  const noteId = req.params.id; // Extracting the note ID from the route parameters
  const userId = req.user._id; // Getting the user's ID from the request object
  try {
    const note = await NoteModel.findOne({ _id: noteId }); // Finding the note by its ID
    if (note.userId.toString() === userId.toString()) { // Checking if the note belongs to the logged-in user
      await NoteModel.findByIdAndUpdate({ _id: noteId }, payload); // Updating the note if the user is authorized
      return res.status(200).json({ message: "Note updated successfully" }); // Sending success response after update
    } else {
      return res.status(401).json({ message: "Unauthorized" }); // Sending unauthorized response if the user is not allowed to update the note
    }
  } catch (error) {
    res.status(500).json({ message: `Error while updating note ${error}` }); // Sending error response if updating the note fails
  }
});

// Route to delete a specific note by its ID
noteRouter.delete("/delete-note/:id", async (req, res) => {
  const noteId = req.params.id; // Extracting the note ID from the route parameters
  const userId = req.user._id; // Getting the user's ID from the request object
  try {
    const note = await NoteModel.findOne({ _id: noteId }); // Finding the note by its ID
    if (note.userId.toString() === userId.toString()) { // Checking if the note belongs to the logged-in user
      await NoteModel.findByIdAndDelete({ _id: noteId }); // Deleting the note if the user is authorized
      return res.status(200).json({ message: "Note Deleted successfully" }); // Sending success response after deletion
    } else {
      return res.status(401).json({ message: "Unauthorized" }); // Sending unauthorized response if the user is not allowed to delete the note
    }
  } catch (error) {
    res.status(500).json({ message: `Error while deleting note ${error}` }); // Sending error response if deleting the note fails
  }
});

export default noteRouter; // Exporting the note router to be used in other parts of the application

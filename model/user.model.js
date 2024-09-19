import mongoose from "mongoose"; // Importing mongoose for creating schemas and models

// Defining the schema for a user
const userSchema = new mongoose.Schema(
  {
    // User's name, required field
    name: { type: String, required: true },

    // User's email, required field, should be unique but not enforced here
    email: { type: String, required: true },

    // User's password, required field, stored as a hashed string (encryption should be handled elsewhere)
    password: { type: String, required: true },

    // User's gender, can only be either "male" or "female", required field
    gender: { type: String, enum: ["male", "female"], required: true },

    // User's age, required field, stored as a number
    age: { type: Number, required: true },
  },
  {
    versionKey: false, // Disables the __v field, which is used to track schema versioning
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Creating a model called 'User' from the schema
const UserModel = mongoose.model("User", userSchema);

export { UserModel }; // Exporting the UserModel for use in other parts of the application

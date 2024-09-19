import express from "express"; // Importing express to create the router and handle routes
import bcrypt from "bcrypt"; // Importing bcrypt for hashing and comparing passwords
import { UserModel } from "../model/user.model.js"; // Importing the User model to interact with the MongoDB collection
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for generating tokens

const userRouter = express.Router(); // Creating a router to define user-related routes

// Route to register a new user
userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender, age } = req.body; // Extracting user details from the request body
  try {
    bcrypt.hash(password, 5, async (err, hash) => { // Hashing the password with a salt round of 5
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" }); // Handling errors during hashing
      }
      const user = new UserModel({
        name,
        email,
        password: hash, // Storing the hashed password
        age,
        gender,
      });
      await user.save(); // Saving the new user to the database
      res.status(201).json({ message: "User registered successfully" }); // Sending success response after user registration
    });
  } catch (error) {
    res.status(500).json({ message: `Error while registering user ${error}` }); // Sending error response if registration fails
  }
});

// Route to log in a user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from the request body
  try {
    const user = await UserModel.findOne({ email }); // Finding the user by email
    if (!user) {
      return res.status(400).json({ message: "User not found" }); // Sending error response if user is not found
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => { // Comparing the provided password with the hashed password
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" }); // Handling errors during password comparison
        }
        if (result) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY); // Generating a JWT token with the user ID
          return res
            .status(200)
            .json({ message: "User logged in successfully", token }); // Sending success response with token after successful login
        } else {
          return res.status(401).json({ message: "Invalid Password" }); // Sending error response if the password is incorrect
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error while logging in user ${error}` }); // Sending error response if login fails
  }
});

export default userRouter; // Exporting the user router to be used in other parts of the application

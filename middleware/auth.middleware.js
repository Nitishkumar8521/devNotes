import jwt from "jsonwebtoken"; // Importing the `jsonwebtoken` library to handle JWT tokens
import { UserModel } from "../model/user.model.js"; // Importing the UserModel from the user model file to interact with the user data

// Middleware function for authenticating users
const auth = async (req, res, next) => {
  
  // Check if the authorization header is present in the request
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Token not found" }); // Return an error if no token is provided
  }
  
  // Extract the token from the authorization header
  const token = req.headers.authorization.split(" ")[1];
  
  // Check if the token is missing after splitting
  if (!token) {
    return res.status(401).json({ message: "Token not found" }); // Return an error if the token is not found
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the token was not decoded successfully
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token, please login again" }); // Return an error if the token is invalid
    }

    // Find the user by the decoded id from the token
    const user = await UserModel.findById(decoded.id);
    
    // Attach the user object to the request object
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Catch any errors during token verification and respond with a 401 status
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default auth; // Exporting the auth middleware for use in other parts of the application

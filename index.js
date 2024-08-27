import express from "express";

import connection from './config/db.js'
import dotenv from "dotenv"
import userRouter from "./route/user.route.js";
import cors from "cors";
import noteRouter from "./route/note.route.js"
import auth from "./middleware/auth.middleware.js";
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors({
    origin:'*' 
}))
// app.use(cors({
//     origin: 'http://127.0.0.1:5173', // Specify the frontend origin
//     credentials: true  // If you're using cookies or authentication headers
// }));
//app.use(cors());

app.use(express.json());
app.use("/user",userRouter);
app.use("/note",auth, noteRouter);

app.get("/",(req,res)=>{
    res.send("Server is running fine"); 
})

app.listen(PORT, async()=>{
    try{
        await connection
        console.log(`Server is running on port ${PORT} and db is also connected`)
    }catch(error){
        console.log("Error in the server",error)
    }
})
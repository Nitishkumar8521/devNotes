import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{ type:String, required:true},
    password:{ type:String, required:true},
    gender:{type:String, enum:["male","female"], required:true},
    age:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true
});

const UserModel = mongoose.model("User", userSchema);

export {UserModel};
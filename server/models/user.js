import mongoose from "mongoose";

//define shcema for posts on our mongoDB
const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  id: { type: String },
});

//add schema to our mongoose veriable
const User = mongoose.model("User", userSchema);

//export schema
export default User;

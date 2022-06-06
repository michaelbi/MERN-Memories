import mongoose from "mongoose";

//define shcema for posts on our mongoDB
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//add schema to our mongoose veriable
const PostMessage = mongoose.model("PostMessage", postSchema);

//export schema
export default PostMessage;

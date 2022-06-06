import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//controller to get all posts from server
export const getPosts = async (req, res) => {
  try {
    //useing our schema to get all posts
    const postMessages = await PostMessage.find();

    //no error return the posts array
    res.status(200).json(postMessages);
  } catch (error) {
    //error's message to console
    res.status(404).json({ message: error.message });
  }
};

//controller to craete new post
export const createPost = async (req, res) => {
  const post = req.body;

  //converting the post request to our schema
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  //try-catch to add new post to the database
  try {
    await newPost.save();

    //return the added post when action completed
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//controller to update a single post
export const updatePost = async (req, res) => {
  //get the post's id from the request params and renaming it
  const { id: _id } = req.params;
  //get the updated post from the request
  const post = req.body;

  //check if id exist in the database
  //send error id not exist
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with that id");

  //send async request to update the post using our schema
  //new:true to indicate we want to notify about the  update
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  //return the updated post
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json("Post Deleted Successfully");
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

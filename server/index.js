import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

//use express in order to recive post/get requests
const app = express();

//setting body parser with express, post size limit is 30mb cuz of images
app.use(bodyParser.json({ limit: "30mb", extended: true }));
//same
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//add cors to express allow access to other sites from the server
app.use(cors());

//define router to the parent route /posts
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Wellcom to memories");
});

//setting connetion url to mongoDB
const CONNECTION_URL = process.env.CONNECTION_URL;
// "mongodb+srv://mbitan:2241992Mb@michael.mrygh.mongodb.net/michael";
const PORT = process.env.PORT;

//connect to mongoDB online
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);

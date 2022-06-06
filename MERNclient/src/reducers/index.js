import { combineReducers } from "redux";
import posts from "./posts";
import currentId from "./currentId";
import auth from "./auth";

export default combineReducers({ posts, currentId, auth });

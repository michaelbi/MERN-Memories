import express from "express";

import { signin, signup } from "../controllers/user.js";

//initialize express's router
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

//export router
export default router;

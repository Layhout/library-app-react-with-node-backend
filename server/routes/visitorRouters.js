import express from "express";
import { addVisitor, allVisitors, editVisitor } from "../controllers/visitorController.js";

const router = express.Router();

router.get("/", allVisitors);
router.post("/add", addVisitor);
router.patch("/edit", editVisitor);

export default router;
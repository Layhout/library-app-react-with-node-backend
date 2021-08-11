import express from "express";
import { addVisitor, allVisitors, editVisitor, top5Visitors, updBorrowRecord } from "../controllers/visitorController.js";

const router = express.Router();

router.get("/", allVisitors);
router.post("/add", addVisitor);
router.patch("/edit", editVisitor);
router.patch("/updBorrow", updBorrowRecord);
router.get("/top5", top5Visitors);

export default router;
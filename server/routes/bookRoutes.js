import express from "express";
import { allBooks, getOneBook, deleteOneBook, addBook, editBook, updBorrow, returnBook, top5Books } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", allBooks);
router.get("/book/:id", getOneBook);
router.delete("/book/:id", deleteOneBook);
router.post("/add", addBook);
router.patch("/edit", editBook);
router.patch("/updBorrow", updBorrow);
router.patch("/return", returnBook);
router.get("/top5", top5Books);

export default router;
import express from "express";
import { allBooks, getOneBook, deleteOneBook, addBook, editBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", allBooks);
router.get("/book/:id", getOneBook);
router.delete("/book/:id", deleteOneBook);
router.post("/add", addBook);
router.patch("/edit", editBook);

export default router;
import express from "express"
import { addCard, allCards, returnCard } from "../controllers/cardController.js";

const router = express.Router();

router.get("/", allCards);
router.post("/add", addCard);
router.patch("/return", returnCard);

export default router;
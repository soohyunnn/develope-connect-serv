import { createWarningLetter, findAllList } from "./WarningController";
import { Router } from "express";
const router = Router();

router.post("/", createWarningLetter);

router.get("/list", findAllList);

module.exports = router;

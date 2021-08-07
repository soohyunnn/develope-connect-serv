import { findAllHashtag } from "./HashtagController";
import { Router } from "express";
const router = Router();

router.get("/", findAllHashtag);

module.exports = router;

import { createCommentLikes, cancelCommentLikes } from "./CommentController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.post("/like", createCommentLikes);

router.post("/cancelLike", cancelCommentLikes);

module.exports = router;

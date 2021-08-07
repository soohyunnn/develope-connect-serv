import { createReply } from "../reply/ReplyController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.post("/", createReply);

module.exports = router;

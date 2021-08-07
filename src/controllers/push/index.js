import { findAllPushList, updatePushStatus } from "./PushController";
import { Router } from "express";
const router = Router();

router.get("/", findAllPushList);

router.put("/:userId", updatePushStatus);

module.exports = router;

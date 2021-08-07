import { findAll, updateStatue } from "./SettlementController";
import { Router } from "express";
const router = Router();

router.get("/", findAll);

router.post("/status", updateStatue);

module.exports = router;

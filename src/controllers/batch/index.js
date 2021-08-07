import { monthSettlement } from "./BatchController";
import { Router } from "express";
const router = Router();

router.get("/settlement", monthSettlement);

module.exports = router;

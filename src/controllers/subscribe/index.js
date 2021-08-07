import {
  execute,
  searchSubsribe,
  searchSubsribeCancel,
} from "../subscribe/subscribeController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.get("/findAll", searchSubsribe);

router.post("/", execute);

router.post("/cancel", searchSubsribeCancel);

module.exports = router;

/**
 * 인증요청관리
 */
import {
  createAuthenticationRequest,
  searchAuthentications,
  detailsAuthentications,
  acknowledgmentAuthentications,
  rejectAuthentications,
  getAllAuthenticationRequestHistory,
} from "../authenticationRequest/authenticationRequestController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.get("/findAll", searchAuthentications);

router.post("/", createAuthenticationRequest);

router.get("/details/:id", detailsAuthentications);

router.put("/acknowledgment/:id", acknowledgmentAuthentications);

router.put("/reject/:id", rejectAuthentications);

router.get("/history", getAllAuthenticationRequestHistory);

module.exports = router;

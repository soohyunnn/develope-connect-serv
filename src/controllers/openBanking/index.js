import {
  RealNameAccountVerification,
  accountRealNameInquiry,
} from "../openBanking/OpenBankingController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.get("/token", RealNameAccountVerification); //사용자인증

router.post("/accountRealNameInquiry", accountRealNameInquiry); //계좌실명조회

module.exports = router;

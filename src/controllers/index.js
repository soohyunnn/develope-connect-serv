import account from "./account";
import authenticationRequest from "./authenticationRequest";
import subscribe from "./subscribe";
import letter from "./letter";
import file from "./file";
import reply from "./reply";
import comment from "./comment";
import bankAccount from "./bankAccount";
import openBanking from "./openBanking";
import accountDevice from "./accountDevice";
import declaration from "./declaration";
import warning from "./warning";
import excel from "./excel";
import push from "./push";
import payment from "./payment";
import batch from "./batch";
import settlement from "./settlement";
import hashtag from "./hashtag";
import { Router } from "express";
const router = Router();

router.use("/api/account", account);

router.use("/api/authentication", authenticationRequest);

router.use("/api/subscribe", subscribe);

router.use("/api/letter", letter);

// router.use("/api/file", file);

router.use("/api/reply", reply);

router.use("/api/comment", comment);

router.use("/api/bankAccount", bankAccount);

router.use("/api/openBanking", openBanking);

router.use("/api/accountDevice", accountDevice);

router.use("/api/declaration", declaration);

router.use("/api/warning", warning);

router.use("/api/excel", excel);

router.use("/api/push", push);

router.use("/api/payment", payment);

router.use("/api/batch", batch);

router.use("/api/settlement", settlement);

router.use("/api/hashtag", hashtag);

module.exports = router;

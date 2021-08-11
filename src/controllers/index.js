import account from "./account";

import { Router } from "express";
const router = Router();

router.use("/api/account", account);

module.exports = router;

import { createBankAccount } from "../bankAccount/BankAccountController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.post("/", createBankAccount);

module.exports = router;

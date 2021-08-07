import { savePaymentHistory } from "./PaymentController";
import { Router } from "express";
const router = Router();

router.post("/", savePaymentHistory);

module.exports = router;

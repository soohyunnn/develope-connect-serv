import { insertAccountDevice } from "./AccountDeviceController";
import { Router } from "express";
// const { Router } = require("express");
const router = Router();

router.post("/", insertAccountDevice);

module.exports = router;

import {
  accountAdminExcel,
  accountSecessionAdminExcel,
  AuthenticationRequestExcel,
  DeclarationExcel,
} from "./ExcelController";
import { Router } from "express";
const router = Router();

router.get("/accountAdmin", accountAdminExcel);

router.get("/accountSecessionAdmin", accountSecessionAdminExcel);

router.get("/authenticationRequest", AuthenticationRequestExcel);

router.get("/declaration", DeclarationExcel);

module.exports = router;

import {
  findDeclarationHistoryList,
  findDeclarationList,
  findDeclarationProcessingHistoryList,
  rejectDeclaration,
  removeDeclaration,
  findDeclarationListByAccount,
} from "./DeclarationController";
import { Router } from "express";
const router = Router();

router.get("/HistoryList", findDeclarationHistoryList);

router.get("/List", findDeclarationList);

router.get("/ProcessingHistoryList", findDeclarationProcessingHistoryList);

router.put("/reject/:id", rejectDeclaration); //신고요청 반려

router.put("/remove/:id", removeDeclaration); //신고요청 삭제

router.get("/accountList", findDeclarationListByAccount); //사용자별 신고 내역 조회

module.exports = router;

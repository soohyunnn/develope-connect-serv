import {
  execute,
  searchLetters,
  datilsLetters,
  hideLetter,
  likes,
  comments,
  findUserDeailLetterList,
  createDeclarationLetter,
  findCommentList,
  updateComment,
  replyComments,
  updateReplyComment,
  deleteReplyComment,
  cancelLikes,
  letterShareCount,
  deleteLetterStatus,
  deleteComment,
  createDeclarationComment,
  searchLettersByHashtag,
} from "./LetterController";
import { Router } from "express";
const router = Router();

router.post("/", execute);

router.get("/findAll", searchLetters);

router.get("/hashtag", searchLettersByHashtag);

router.get("/details/:id", datilsLetters);

router.put("/hideLetter/:id", hideLetter);

router.post("/like", likes);

router.post("/cancelLike", cancelLikes);

router.post("/create/comments", comments);

router.get("/comments", findCommentList);

router.put("/comments/:id", updateComment);

router.delete("/comments/:id", deleteComment);

router.post("/replyComments", replyComments);

router.put("/replyComments/:id", updateReplyComment);

router.delete("/replyComments/delete/:id", deleteReplyComment);

router.get("/findUserDeailLetterAll", findUserDeailLetterList);

router.post("/createDeclarationLetter", createDeclarationLetter);

router.post("/letterShare", letterShareCount);

router.delete("/deleteLetterStatus", deleteLetterStatus);

router.post("/createDeclarationComment", createDeclarationComment);

module.exports = router;

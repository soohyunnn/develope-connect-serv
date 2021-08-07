import {
  create,
  findAll,
  detail,
  updateStatus,
  letterLikes,
  createComments,
  findUserDeailLetterAll,
  findAllComments,
  updateComments,
  createReplyComments,
  updateReplyComments,
  deleteReplyComments,
  letterCancelLikes,
  letterShare,
  deleteLetter,
  deleteComments,
  findAllByHashtag,
} from "../../service/LetterService";
import { logger } from "../../config/winston";

export const execute = async (req, res, next) => {
  const result = await create(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Not Found Data.");
  }
};

export const searchLetters = async (req, res, next) => {
  const result = await findAll(req.query);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const searchLettersByHashtag = async (req, res, next) => {
  logger.info(`레터 조회 (해시태그로) => req : ${JSON.stringify(req.query)}`);
  findAllByHashtag(req.query)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const datilsLetters = async (req, res, next) => {
  const result = await detail(req.params, req.query);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(404).send("NOT FOUND.");
  }
};

export const hideLetter = async (req, res, next) => {
  console.log("레터 숨기기");
  const result = await updateStatus(req.params, req.body);
  res.json(result);
};

export const likes = async (req, res, next) => {
  console.log("레터 좋아요");
  const result = await letterLikes(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const cancelLikes = async (req, res, next) => {
  console.log("레터 좋아요 취소");
  const result = await letterCancelLikes(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const comments = async (req, res, next) => {
  console.log("댓글 등록");
  const result = await createComments(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const updateComment = async (req, res, next) => {
  console.log("댓글 수정");
  const result = await updateComments(req.params, req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const deleteComment = async (req, res, next) => {
  console.log("댓글 삭제");
  const result = await deleteComments(req.params);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const createDeclarationComment = async (req, res, next) => {
  console.log("레터 - 댓글 신고", req.body);
  const result = await declarationComment(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const findCommentList = async (req, res, next) => {
  console.log("댓글 목록조회");
  console.log("req111", req.query);
  const result = await findAllComments(req.query);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const replyComments = async (req, res, next) => {
  console.log("대댓글 등록");
  const result = await createReplyComments(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const updateReplyComment = async (req, res, next) => {
  console.log("대댓글 수정");
  const result = await updateReplyComments(req.params, req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const deleteReplyComment = async (req, res, next) => {
  console.log("대댓글 삭제");
  const result = await deleteReplyComments(req.params);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const findUserDeailLetterList = async (req, res, next) => {
  console.log("유저상세 - 레터목록 조회");
  const result = await findUserDeailLetterAll(req.query);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const createDeclarationLetter = async (req, res, next) => {
  console.log("레터 - 레터 신고", req.body);
  const result = await declarationLetter(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const letterShareCount = async (req, res, next) => {
  console.log("레터 공유수 증가");
  const result = await letterShare(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const deleteLetterStatus = async (req, res, next) => {
  console.log("레터 삭제");
  const result = await deleteLetter(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export default {
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
};

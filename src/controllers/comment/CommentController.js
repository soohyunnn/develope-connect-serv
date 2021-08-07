import { commentLikes, commentCancelLikes } from "../../service/CommentService";

export const createCommentLikes = async (req, res, next) => {
  console.log("레터 댓글 좋아요!!");
  const result = await commentLikes(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const cancelCommentLikes = async (req, res, next) => {
  console.log("레터 댓글 좋아요 취소");
  const result = await commentCancelLikes(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export default {
  createCommentLikes,
  cancelCommentLikes,
};

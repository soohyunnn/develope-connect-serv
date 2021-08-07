import models from "../models";
import { Op, where } from "sequelize";

/**
 * 댓글 좋아요
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const commentLikes = async (req, res) => {
  // const result11 = await models.Account.findOne({
  //   where: { id: req.userId },
  // });
  try {
    const comment = await models.Comments.findOne({
      where: { id: req.commentId },
    });

    //해당 레터 좋아요 카운터 수 올리기
    await models.Comments.update(
      {
        //데이터
        like_count: comment.dataValues.like_count + 1,
      },
      {
        // 조건
        where: { id: req.commentId },
      }
    );

    const result = await models.CommentLikes.create({
      comment_id: req.commentId,
      user_id: req.userId,
    });
    return result.dataValues;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 댓글 좋아요 취소
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const commentCancelLikes = async (req, res) => {
  try {
    const result = await models.CommentLikes.destroy({
      where: { comment_id: req.commentId, user_id: req.userId },
    });

    const comment = await models.Comments.findOne({
      where: { id: req.commentId },
    });

    console.log("aaaa", comment.dataValues.like_count);

    //해당 댓글 좋아요 카운터 수 올리기
    const deleteCancelComment = await models.Comments.update(
      {
        //데이터
        like_count: comment.dataValues.like_count - 1,
      },
      {
        // 조건
        where: { id: req.commentId },
      }
    );

    return "200";
  } catch (e) {
    console.log(e);
  }
};

export default {
  commentLikes,
  commentCancelLikes,
};

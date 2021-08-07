import models from "../models";
import { Op, or, where } from "sequelize";

/**
 * 답글 등록
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const create = async (req, res) => {
  try {
    //보내는 사람
    const sender = await models.Account.findOne({
      where: { id: req.senderId },
    });

    //받는 사람
    const recipient = await models.Account.findOne({
      where: { id: req.recipientId },
    });

    // console.log('sender', sender)

    if (recipient === null || sender === null) {
      throw new Error("404", "Not Found Data!", "404");
    }

    const result = await models.Reply.create({
      sender_id: sender.dataValues.id,
      recipient_id: recipient.dataValues.id,
      reply_letter_id: req.letterId,
      content: req.content,
      save_state: req.saveState,
    });

    await models.Letter.update(
      {
        //데이터
        reply_letter_id: result.dataValues.id,
        reply_yn: true,
      },
      {
        // 조건
        where: { id: req.letterId },
      }
    );
    // console.log("result", result);
    return result.dataValues;
  } catch (e) {
    console.log("error", e);
  }
};

export default {
  create,
};

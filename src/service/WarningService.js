import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

/**
 * 경고레터 발송
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const create = async (req, res) => {
  logger.info(`service req : ${JSON.stringify(req)}`);
  try {
    //받는 사람 조회
    const resultAccount = await models.Account.findOne({
      where: { userId: req.recipientId },
    });

    console.log("resultAccount", resultAccount.dataValues);

    const resultWarning = await models.Warning.create({
      title: req.title,
      content: req.content,
      sender_id: req.senderId,
      recipient_id: resultAccount.dataValues.id,
    });

    console.log("resultWarning", resultWarning);
    logger.info(
      `WarningService - create : ${JSON.stringify(resultWarning.dataValue)}`
    );
    return resultWarning;
  } catch (e) {
    logger.error(`WarningService - create : ${e}`);
    throw e;
  }
};

/**
 * 경고내역 조회(사용자별)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getList = async (req, res) => {
  logger.info(`service req : ${JSON.stringify(req)}`);
  try {
    let pageNum = req.page;
    let offset = 0;
    let limit = 10;

    if (pageNum > 1) {
      offset = limit * (pageNum - 1);
    }

    if (req.limit != null) {
      limit = Number(req.limit);
    }

    const count = await models.Warning.count({
      where: {
        recipient_id: req.userId,
      },
    });

    const resultWarning = await models.Warning.findAll({
      where: {
        recipient_id: req.userId,
      },
      offset: offset,
      limit: limit,
      order: [["createdAt", "ASC"]], //최신순
    });
    logger.info(
      `WarningService - getList : ${JSON.stringify(resultWarning.dataValue)}`
    );
    return { data: resultWarning, count };
  } catch (e) {
    logger.error(`WarningService - create : ${e}`);
    throw e;
  }
};

export default {
  create,
  getList,
};

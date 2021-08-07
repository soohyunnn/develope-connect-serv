import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

export const getList = async (req) => {
  try {
    const resultPush = await models.Push.findAll({
      where: {
        user_id: req.userId,
      },
    });
    return resultPush;
  } catch (e) {
    logger.error(`e ${e}`);
    throw e;
  }
};

export const pushRead = async (params, body) => {
  try {
    const resultPush = await models.Push.update(
      {
        read_yn: true,
      },
      {
        where: {
          user_id: params.userId,
          id: body.pushId,
        },
      }
    );
    if (resultPush == 1) {
      return "success";
    }
  } catch (e) {
    logger.error(`e ${e}`);
    throw e;
  }
};

export default {
  getList,
  pushRead,
};

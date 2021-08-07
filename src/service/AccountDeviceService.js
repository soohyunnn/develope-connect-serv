import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

/**
 * 회원 디바이스 정보 저장
 * @param {*} req
 * @param {*} res
 */
export const createAccountDevice = async (req, res) => {
  try {
    logger.info(`req : ${JSON.stringify(req)}`);
    const user = await models.Account.findOne({
      where: { id: req.userId },
    });

    if (user == null) {
      const e = new Error("Not Fount Recode");
      e.status = 404;
      e.message = "Not Fount Recode";
      throw e;
    }

    const findOneDevice = await models.AccountDevice.findOne({
      where: { device_token: req.deviceToken },
    });

    if (findOneDevice == null) {
      const result = await models.AccountDevice.create({
        device_token: req.deviceToken,
        user_id: user.dataValues.id,
      });

      logger.info(`result : ${JSON.stringify(result.dataValues)}`);
      return result.dataValues;
    }
  } catch (error) {
    return error.response;
  }
};

export default {
  createAccountDevice,
};

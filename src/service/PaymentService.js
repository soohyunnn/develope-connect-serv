import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

export const createPayment = async (req) => {
  try {
    const resultAccount = await models.Account.findOne({
      where: {
        id: req.userId,
      },
    });

    const resultPayment = await models.Payment.create({
      iapJson: req.iapJson,
      payment_amount: req.paymentAmount,
      user_id: resultAccount.dataValues.id,
    });
    logger.info(
      `PaymentService - createPayment : ${JSON.stringify(resultPayment)}`
    );
    return resultPayment;
  } catch (e) {
    logger.error(`e ${e}`);
    throw e;
  }
};

export default {
  createPayment,
};

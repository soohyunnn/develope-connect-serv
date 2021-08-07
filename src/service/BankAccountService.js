import models from "../models";
import { Op, or, where } from "sequelize";

/**
 * 계좌 등록
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const create = async (req, res) => {
  try {
    const result = await models.BankAccount.create({
      phone: req.phone,
      account_holder: req.accountHolder,
      bank_name: req.bankName,
      account_number: req.accountNumber,
      agreeYn: true,
    });

    return result.dataValues;
  } catch (e) {
    console.log("error", e);
  }
};

export default {
  create,
};

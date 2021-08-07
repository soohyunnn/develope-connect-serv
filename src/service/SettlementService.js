import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

/**
 * 정산내역 목록 조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getList = async (req, res) => {
  try {
    let where = {};
    let pageNum = req.page;
    let offset = 0;
    let limit = 10;

    if (pageNum > 1) {
      offset = limit * (pageNum - 1);
    }

    if (req.limit != null) {
      limit = Number(req.limit);
    }

    //기간검색
    if (req?.settlementMonth) {
      where.settlement_month = { [Op.eq]: req.settlementMonth };
    }

    //키워드 검색
    if (req?.keyword) {
      if (req.searchType == "id") {
        where.user_user_id = { [Op.eq]: req.keyword };
      }
      if (req.searchType == "name") {
        where.user_name = { [Op.eq]: req.keyword };
      }
    }

    const resultSettlement = await models.Settlement.findAll({
      raw: true,
      where: where,
      offset: offset,
      limit: limit,
      order: [["createdAt", "ASC"]], //최신순
    });

    logger.info(
      `SettlementService - getList => ${JSON.stringify(resultSettlement)}`
    );
    return resultSettlement;
  } catch (e) {
    logger.error(`e : ${e}`);
    throw error;
  }
};

/**
 * 정산내역 처리
 * @param {*} req
 * @param {*} res
 */
export const changeStatue = async (req, res) => {
  logger.info(`req : ${JSON.stringify(req)}`);
  try {
    const updateSettlement = Promise.all(
      req.settlementId.map((s) => {
        models.Settlement.update(
          {
            settlement_yn: true,
          },
          {
            where: {
              id: s,
            },
          }
        );
      })
    );
    return "success";
  } catch (e) {
    console.log("e", e);
    logger.error(`e : ${e}`);
    throw e;
  }
};

export default {
  getList,
  changeStatue,
};

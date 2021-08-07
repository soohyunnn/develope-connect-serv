import models from "../models";
import { Op } from "sequelize";

export const create = async (req, res) => {
  // console.log("req:: ", req);
  try {
    const result = await models.Subscribe.create({
      status: "SUBSCRIBE",
      ranker_id: req.rankerId,
      subscriber_id: req.subscriberId,
    });
    return result.dataValues;
  } catch (e) {
    console.log("e", e);
  }
};

export const cancleSubscribe = async (req, res) => {
  // console.log("req:: ", req);
  try {
    const result = await models.Subscribe.destroy({
      where: {
        ranker_id: req.rankerId,
        subscriber_id: req.subscriberId,
      },
    });
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    console.log("e", e);
  }
};

export const findAll = async (params, res) => {
  console.log("params", params);
  const where = {};
  let userData = null;

  if (params?.keyword) {
    userData = await models.Account.findOne({
      where: {
        [Op.or]: [
          {
            userId: { [Op.like]: "%" + params.keyword + "%" },
          },
          {
            name: { [Op.like]: "%" + params.keyword + "%" },
          },
        ],
      },
    });
  }

  if (params?.rankerId) {
    where.ranker_id = { [Op.eq]: params.rankerId };
    if (userData != null && params?.keyword) {
      where.subscriber_id = { [Op.eq]: userData.dataValues.id };
    }
    if (userData == null && params?.keyword) {
      where.subscriber_id = { [Op.eq]: 0 };
    }
  }
  // console.log("userData", userData);

  if (params?.subsribeId) {
    where.subscriber_id = { [Op.eq]: params.subsribeId };
    if (userData != null && params?.keyword) {
      where.ranker_id = { [Op.eq]: userData.dataValues.id };
    }
    if (userData == null && params?.keyword) {
      where.ranker_id = { [Op.eq]: 0 };
    }
  }

  try {
    const results = await models.Subscribe.findAll({
      raw: true,
      where: where,
    });
    console.log("results ", results);

    const test = await Promise.all(
      results.map((d) => {
        const where = {};

        if (params?.rankerId) {
          where.id = { [Op.eq]: d.subscriber_id };
        }
        if (params?.subsribeId) {
          where.id = { [Op.eq]: d.ranker_id };
        }

        return models.Account.findOne({
          where: where,
          order: [["loginOn", "ASC"]],
        });
      })
    );

    const data = test.map((d) => {
      let accountList = {};
      return (accountList = {
        id: d.dataValues.id,
        userId: d.dataValues.userId,
        name: d.dataValues.name,
        restStatus: d.dataValues.restStatus,
        imageId: d.dataValues.imageId,
      });
    });

    //loginOn 최신 순
    data.sort((a, b) => {
      return new Date(b.loginOn) - new Date(a.loginOn);
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  create,
  cancleSubscribe,
  findAll,
};

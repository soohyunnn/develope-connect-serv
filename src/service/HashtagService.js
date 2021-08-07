import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

export const searchHashtag = async (req, res) => {
  console.log("req", req);
  try {
    const resultHashtag = await models.Hashtag.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.keyword + "%",
        },
      },
    });
    return resultHashtag;
  } catch (e) {
    logger.error(`e ${e}`);
    throw e;
  }
};

export default {
  searchHashtag,
};

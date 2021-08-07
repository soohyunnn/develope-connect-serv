import { logger } from "../../config/winston";
import { create, getList } from "../../service/WarningService";

export const createWarningLetter = async (req, res, next) => {
  logger.info(`경고레터 전송 : ${JSON.stringify(req.body)}`);
  await create(req.body)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      logger.error(`error : ${e}`);
      res.status(500).send("Server Error");
    });
};

export const findAllList = async (req, res, next) => {
  logger.info(`경고레터 목록조회(사용자별) : ${JSON.stringify(req.query)}`);
  await getList(req.query)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      logger.error(`error : ${e}`);
      res.status(500).send("Server Error");
    });
};

export default {
  createWarningLetter,
  findAllList,
};

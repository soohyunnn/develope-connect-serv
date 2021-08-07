import { getList, changeStatue } from "../../service/SettlementService";
import { logger } from "../../config/winston";

export const findAll = async (req, res, next) => {
  logger.info(`관리자 - 정산관리 내역 조회 : ${JSON.stringify(req.query)}`);
  await getList(req.query)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const updateStatue = async (req, res, next) => {
  logger.info(`관리자 - 정산관리 상태변경 : ${JSON.stringify(req.body)}`);
  await changeStatue(req.body)
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
  findAll,
  updateStatue,
};

import { getList, pushRead } from "../../service/PushService";
import { logger } from "../../config/winston";

export const findAllPushList = async (req, res, next) => {
  logger.info(`푸시알람 목록 조회 => query : ${JSON.stringify(req.query)}`);
  getList(req.query)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const updatePushStatus = async (req, res, next) => {
  logger.info(
    `푸시알람 읽음 여부 => params : ${JSON.stringify(
      req.params
    )} , body : ${JSON.stringify(req.body)}`
  );
  pushRead(req.params, req.body)
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export default {
  findAllPushList,
  updatePushStatus,
};

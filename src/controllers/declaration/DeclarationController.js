import {
  getDeclarationHistoryList,
  getDeclarationList,
  getDeclarationProcessingHistoryList,
  reject,
  remove,
  getDeclarationListByAccount,
} from "../../service/DeclarationService";
import { logger } from "../../config/winston";

export const findDeclarationHistoryList = async (req, res, next) => {
  logger.info(`신고내역 조회 : ${JSON.stringify(req.query)}`);
  getDeclarationHistoryList(req.query)
    .then((d) => {
      logger.info(`findDeclarationHistoryList - ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const findDeclarationList = async (req, res, next) => {
  logger.info(`신고관리 목록 조회 : ${JSON.stringify(req.query)}`);
  getDeclarationList(req.query)
    .then((d) => {
      logger.info(`findDeclarationList - ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const findDeclarationProcessingHistoryList = async (req, res, next) => {
  logger.info(`신고 처리내역 조회 : ${JSON.stringify(req.query)}`);
  getDeclarationProcessingHistoryList(req.query)
    .then((d) => {
      logger.info(
        `findDeclarationProcessingHistoryList - ${JSON.stringify(d)}`
      );
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const rejectDeclaration = async (req, res, next) => {
  logger.info(
    `신고요청 반려 ${JSON.stringify(req.params)} || ${JSON.stringify(req.body)}`
  );
  await reject(req.params, req.body)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      if (e.status == "404") {
        res.status(404).send("Not Found Recode");
      }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const removeDeclaration = async (req, res, next) => {
  logger.info(
    `신고요청 삭제 ${JSON.stringify(req.params)}|| ${JSON.stringify(req.body)}`
  );
  await remove(req.params, req.body)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      if (e.status == "404") {
        res.status(404).send("Not Found Recode");
      }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const findDeclarationListByAccount = async (req, res, next) => {
  logger.info(`사용자별 신고내역 조회 : ${JSON.stringify(req.query)}`);
  getDeclarationListByAccount(req.query)
    .then((d) => {
      logger.info(`findDeclarationListByAccount - ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send("Server Error");
    });
};

export default {
  findDeclarationHistoryList,
  findDeclarationList,
  findDeclarationProcessingHistoryList,
  rejectDeclaration,
  removeDeclaration,
  findDeclarationListByAccount,
};

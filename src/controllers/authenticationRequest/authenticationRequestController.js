import { logger } from "../../config/winston";
import {
  create,
  findAll,
  detail,
  acknowledgment,
  reject,
  findAllAuthenticationRequestHistory,
} from "../../service/AuthenticationRequestService";

export const createAuthenticationRequest = async (req, res, next) => {
  logger.info(`인증요청 등록 ${JSON.stringify(req.body)}`);
  await create(req.body)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      // if (e.status == "404") {
      //   res.status(404).send("Not Found Recode");
      // }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const searchAuthentications = async (req, res, next) => {
  logger.info(`인증요청 목록 조회 ${JSON.stringify(req.query)}`);
  await findAll(req.query)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      // if (e.status == "404") {
      //   res.status(404).send("Not Found Recode");
      // }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const detailsAuthentications = async (req, res, next) => {
  logger.info(`인증요청 상세 조회 ${JSON.stringify(req.params)}`);
  await detail(req.params)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      // if (e.status == "404") {
      //   res.status(404).send("Not Found Recode");
      // }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const acknowledgmentAuthentications = async (req, res, next) => {
  logger.info(
    `인증요청 승인 => params : ${JSON.stringify(
      req.params
    )}, body : ${JSON.stringify(req.body)}`
  );
  await acknowledgment(req.params, req.body)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      // if (e.status == "404") {
      //   res.status(404).send("Not Found Recode");
      // }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const rejectAuthentications = async (req, res, next) => {
  logger.info(
    `인증요청 반려 ${JSON.stringify(req.params)} || ${JSON.stringify(req.body)}`
  );
  await reject(req.params, req.body)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      // if (e.status == "404") {
      //   res.status(404).send("Not Found Recode");
      // }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export const getAllAuthenticationRequestHistory = async (req, res, next) => {
  logger.info(`인증요청 내역 목록 조회 ${JSON.stringify(req.query)}`);
  await findAllAuthenticationRequestHistory(req.query)
    .then((d) => {
      logger.info(`result Data : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      // if (e.status == "404") {
      //   res.status(404).send("Not Found Recode");
      // }
      logger.error(`error : ${JSON.stringify(e)}`);
      res.status(500).send("Server Error");
    });
};

export default {
  createAuthenticationRequest,
  searchAuthentications,
  detailsAuthentications,
  acknowledgmentAuthentications,
  rejectAuthentications,
  getAllAuthenticationRequestHistory,
};

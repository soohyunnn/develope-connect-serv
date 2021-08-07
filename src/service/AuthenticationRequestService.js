import models from "../models";
import { and, Op, or } from "sequelize";
import { param } from "../controllers";
import { logger } from "../config/winston";
import axios from "axios";
import sequelize from "../models";
// const axios = require("axios");
// const sequelize = require("../models").sequelize;

const MAILURL = process.env.MAIL_URL;

/**
 * 인증요청 등록
 * @param {*} req
 * @param {*} res
 */
export const create = async (req, res) => {
  logger.info(`인증요청 등록 ${JSON.stringify(req)}`);
  try {
    const result = await models.AuthenticationRequest.create({
      userId: req.userId,
      name: req.name,
      requestName: req.requestName,
      activityName: req.activityName,
      activityField: req.activityField,
      imageId: req.imageId,
      status: "WAIT",
    });
    return result.dataValues;
  } catch (e) {
    logger.error(
      `AuthenticationRequestService - create : ${JSON.stringify(error)}`
    );
    throw error;
  }
};

/**
 * 인증요청목록 조회
 * @param {*} params
 * @param {*} res
 * @returns
 */
export const findAll = async (req, res) => {
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

    //기간 검색
    if (req?.sDate && req?.eDate) {
      if (req.searchType == "requestDate") {
        where.createdAt = { [Op.between]: [req.sDate, req.eDate] };
      }
      if (req.searchType == "processingDate") {
        where.updatedAt = { [Op.between]: [req.sDate, req.eDate] };
      }
    }

    //처리상태
    if (req?.status) {
      where.status = { [Op.eq]: req.status };
    }

    //키워드 검색
    if (req?.keyword) {
      where = {
        [Op.or]: {
          userId: {
            [Op.like]: "%" + req.keyword + "%",
          },
          requestName: {
            [Op.like]: "%" + req.keyword + "%",
          },
        },
      };
    }

    const count = await models.AuthenticationRequest.count({
      raw: true,
      where: where,
    });

    const results = await models.AuthenticationRequest.findAll({
      raw: true,
      where: where,
      offset: offset,
      limit: limit,
      order: [["createdAt", "ASC"]], //최신순
    });
    const data = results.map((d) => {
      let accountList = {};
      return (accountList = {
        id: d.id,
        userId: d.userId,
        requestName: d.requestName,
        createdAt: d.createdAt,
        status: d.status,
        updatedAt: d.updatedAt, //처리일시
      });
    });
    return { data, count: count };
  } catch (e) {
    logger.error(
      `AuthenticationRequestService - findAll : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

/**
 * 인증요청 상세 조회
 * @param {*} param
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const detail = async (param, req, res) => {
  console.log("req", param, req);
  try {
    const result = await models.AuthenticationRequest.findOne({
      where: { id: param.id },
    });
    const { dataValues } =
      (await models.Files.findOne({
        where: { id: result.dataValues.imageId },
      })) || {};

    if (result != null) {
      return {
        id: result.dataValues.id,
        userId: result.dataValues.userId,
        name: result.dataValues.name,
        requestName: result.dataValues.requestName,
        activityName: result.dataValues.activityName,
        accountHolder: result.dataValues.accountHolder,
        activityField: result.dataValues.activityField,
        accountNumber: result.dataValues.accountNumber,
        imageId: dataValues.id,
        imageFilename: dataValues.filename,
        status: result.dataValues.status,
      };
    } else {
      return "";
    }
  } catch (e) {
    logger.error(
      `AuthenticationRequestService - detail : ${JSON.stringify(error)}`
    );
    throw error;
  }
};

/**
 * 인증요청 승인
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const acknowledgment = async (params, req, res) => {
  logger.info(
    `AuthenticationRequestService - acknowledgment => params : ${JSON.stringify(
      param
    )} , req : ${JSON.stringify(req)}`
  );
  try {
    const user = await models.AuthenticationRequest.findOne({
      where: { id: params.id },
    });

    if (user != null) {
      const result = await models.AuthenticationRequest.update(
        {
          status: "APPROVAL",
          updatedAt: new Date(),
        },
        {
          where: { id: params.id },
        }
      );
      if (result == 1) {
        const accountResult = await models.Account.update(
          {
            certification: true,
          },
          {
            where: { id: params.id },
          }
        );
        const history = await models.AuthenticationRequestHistory.create({
          authenticationRequestId: params.id,
          status: "APPROVAL",
        });
        if (history != null) {
          const result = await axios.post(MAILURL, {
            userId: user.dataValues.userId,
            createdAt: history.dataValues.createdAt,
            mail: user.dataValues.email,
            type: "approval",
          });
          return "sucess";
        }
      }
    } else {
      const e = new Error("Server Error");
      e.status = 500;
      e.message = "Server Error";
      throw e;
    }
  } catch (e) {
    logger.error(
      `AuthenticationRequestService - acknowledgment : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

/**
 * 인증요청 반려
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const reject = async (params, req, res) => {
  console.log("req", params);
  const t = await sequelize.sequelize.transaction();
  try {
    const result = await sequelize.sequelize.transaction(async (t) => {
      const authenticationRequest = await models.AuthenticationRequest.findOne(
        {
          where: { id: params.id },
        },
        { transaction: t }
      );
      if (authenticationRequest == null) {
        const e = new Error("Not Found Recode");
        e.status = 404;
        e.message = "Not Found Recode";
        throw e;
      }
      const user = await models.Account.findOne({
        where: { userId: authenticationRequest.dataValues.userId },
      });
      const result = await models.AuthenticationRequest.update(
        {
          status: "REJECT",
          content: req.content,
          updatedAt: new Date(),
        },
        {
          where: { id: params.id },
        },
        { transaction: t }
      );
      if (result == 1) {
        const history = await models.AuthenticationRequestHistory.create(
          {
            authenticationRequestId: params.id,
            status: "REJECT",
            content: req.content,
          },
          { transaction: t }
        );
        if (history != null) {
          const result = await axios.post(MAILURL, {
            userId: user1.dataValues.userId,
            createdAt: history.dataValues.createdAt,
            content: history.dataValues.content,
            mail: user.dataValues.email,
            type: "reject",
          });
          // console.log("result", result);
          return "sucess";
        }
      }
    });
  } catch (e) {
    console.log("e", e);
    logger.error(
      `AuthenticationRequestService - companion : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

/**
 * 인증요청내역목록 조회
 * @param {*} params
 * @param {*} res
 * @returns
 */
export const findAllAuthenticationRequestHistory = async (req, res) => {
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

    const count = await models.AuthenticationRequestHistory.count({
      where: { authenticationRequestId: req.id },
    });

    const results = await models.AuthenticationRequestHistory.findAll({
      raw: true,
      where: { authenticationRequestId: req.id },
      offset: offset,
      limit: limit,
      order: [["createdAt", "ASC"]], //최신순
    });
    const data = results.map((d) => {
      let accountList = {};
      return (accountList = {
        id: d.id,
        authenticationRequestId: d.authenticationRequestId,
        status: d.status,
        createdAt: d.createdAt,
        content: d.content,
      });
    });
    return { data, count: count };
  } catch (e) {
    logger.error(
      `AuthenticationRequestService - findAllAuthenticationRequestHistory : ${JSON.stringify(
        error
      )}`
    );
    throw error;
  }
};

export default {
  create,
  findAll,
  detail,
  acknowledgment,
  reject,
  findAllAuthenticationRequestHistory,
};

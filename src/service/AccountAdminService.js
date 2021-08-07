import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";
import axios from "axios";

/**
 * 회원 목록 조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAll = async (req, res) => {
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
      if (req.searchType == "createdAt") {
        where.createdAt = { [Op.between]: [req.sDate, req.eDate] };
      }
      if (req.searchType == "loginOn") {
        where.loginOn = { [Op.between]: [req.sDate, req.eDate] };
      }
    }

    //키워드 검색
    if (req?.keyword) {
      where = {
        [Op.or]: {
          name: {
            [Op.like]: "%" + req.keyword + "%",
          },
          userId: {
            [Op.like]: "%" + req.keyword + "%",
          },
          email: {
            [Op.like]: "%" + req.keyword + "%",
          },
        },
      };
    }

    const count = await models.Account.count({
      raw: true,
      where: where,
    });

    const results = await models.Account.findAll({
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
        name: d.name,
        email: d.email,
        createdAt: d.createdAt,
        loginOn: d.loginOn,
      });
    });
    return { data, count: count };
  } catch (error) {
    logger.error(`AccountAdminService - getAll : ${error}`);
    throw error;
  }
};

/**
 * 회원 상세 조회
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getOne = async (params, req, res) => {
  try {
    const result = await models.Account.findOne({
      where: { id: params.id },
    });

    let declaration = 0;
    let warning = 0;

    //신고건수 조회
    declaration = await models.DeclarationHistory.count({
      where: { user_id: result.dataValues.userId },
    });

    //경고건수 조회
    warning = await models.Warning.count({
      where: { recipient_id: result.dataValues.id },
    });

    if (result != null) {
      return {
        id: result.dataValues.id,
        userId: result.dataValues.userId,
        name: result.dataValues.name,
        email: result.dataValues.email,
        createdAt: result.dataValues.createdAt,
        loginOn: result.dataValues.loginOn,
        accountHolder: result.dataValues.accountHolder,
        bankName: result.dataValues.bankName,
        accountNumber: result.dataValues.accountNumber,
        category: result.dataValues.category,
        certification: result.dataValues.certification,
        activate: result.dataValues.activate,
        kakao: result.dataValues.kakao,
        naver: result.dataValues.naver,
        facebook: result.dataValues.facebook,
        google: result.dataValues.google,
        apple: result.dataValues.apple,
        declaration: declaration, //신고 건수
        warning: warning, //경고 건수
      };
    } else {
      return "";
    }
    // else {
    //   const e = new Error("Not Found Recode");
    //   e.status = 404;
    //   e.message = "Not Found Recode";
    //   throw e;
    // }
  } catch (error) {
    logger.error(`AccountAdminService - getOne : ${JSON.stringify(error)}`);
    throw error;
  }
};

/**
 * 강제탈퇴회원 목록 조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllSecession = async (req, res) => {
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
      if (req.searchType == "createdAt") {
        where.createdAt = { [Op.between]: [req.sDate, req.eDate] };
      }
      if (req.searchType == "loginOn") {
        where.loginOn = { [Op.between]: [req.sDate, req.eDate] };
      }
    }

    //키워드 검색
    if (req?.keyword) {
      where = {
        [Op.or]: {
          name: {
            [Op.like]: "%" + req.keyword + "%",
          },
          userId: {
            [Op.like]: "%" + req.keyword + "%",
          },
          email: {
            [Op.like]: "%" + req.keyword + "%",
          },
        },
      };
    }

    const count = await models.AccountSecession.count({
      raw: true,
      where: where,
    });

    const results = await models.AccountSecession.findAll({
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
        name: d.name,
        email: d.email,
        createdAt: d.createdAt,
        loginOn: d.loginOn,
      });
    });
    return { data, count: count };
  } catch (error) {
    logger.error(
      `AccountAdminService - getAllSecession : ${JSON.stringify(e)}`
    );
    throw error;
  }
};

/**
 * 강제탈퇴회원 상세 조회
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getOneSecession = async (params, req, res) => {
  try {
    const result = await models.AccountSecession.findOne({
      where: { id: params.id },
    });

    if (result != null) {
      return {
        id: result.dataValues.id,
        userId: result.dataValues.userId,
        name: result.dataValues.name,
        email: result.dataValues.email,
        createdAt: result.dataValues.createdAt,
        joinAt: result.dataValues.joinAt,
        kakao: result.dataValues.kakao,
        naver: result.dataValues.naver,
        facebook: result.dataValues.facebook,
        google: result.dataValues.google,
        apple: result.dataValues.apple,
        declaration: 0, //TODO 신고 건수 일단 0으로 셋팅
        warning: 0, //TODO 경고 건수 일단 0으로 셋팅
        reasonForWithdrawal: result.dataValues.reasonForWithdrawal,
      };
    } else {
      return "";
    }
    // else {
    //   const e = new Error("Not Found Recode");
    //   e.status = 404;
    //   e.message = "Not Found Recode";
    //   throw e;
    // }
  } catch (error) {
    logger.error(`AccountAdminService - getOne : ${JSON.stringify(error)}`);
    throw error;
  }
};
export const modifiedAccount = async (req, res) => {};

/**
 * 강제회원탈퇴
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const secession = async (params, req, res) => {
  console.log("req", params, req);
  try {
    const user = await models.Account.findOne({
      where: { id: params.id },
    });
    console.log("user", user.dataValues);

    const result = await models.Account.destroy({
      where: { id: params.id },
    });

    if (result != null) {
      const createAccountSecession = await models.AccountSecession.create({
        userId: user.dataValues.userId,
        password: user.dataValues.password,
        email: user.dataValues.email,
        name: user.dataValues.name,
        serviceAgree: user.dataValues.serviceAgree,
        informationAgree: user.dataValues.informationAgree,
        kakao: user.dataValues.kakao,
        naver: user.dataValues.naver,
        facebook: user.dataValues.facebook,
        google: user.dataValues.google,
        apple: user.dataValues.apple,
        status: user.dataValues.status,
        restStatus: user.dataValues.restStatus,
        reasonForWithdrawal: req.reasonForWithdrawal,
        joinAt: user.dataValues.createdAt,
        compulsionSecessionYn: true,
      });
      if (createAccountSecession != null) {
        const result = await axios.post(MAILURL, {
          userId: createAccountSecession.dataValues.userId,
          createdAt: createAccountSecession.dataValues.createdAt,
          mail: createAccountSecession.dataValues.email,
          type: "secession",
        });
        return "200";
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAll,
  getOne,
  getAllSecession,
  getOneSecession,
  secession,
};

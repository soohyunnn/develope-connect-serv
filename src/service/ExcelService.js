import { logger } from "../config/winston";
import models from "../models";
import { Op } from "sequelize";
import Excel from "exceljs";

/**
 * 회원관리 어드민 엑셀 다운로드
 * @param {*} req
 * @returns
 */
export const excelAccountAdminDownload = async (req) => {
  try {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("회원관리");
    worksheet.columns = [
      { header: "NO", key: "no" },
      { header: "ID", key: "id" },
      { header: "사용자명", key: "name" },
      { header: "이메일 주소", key: "email" },
      { header: "가입일시", key: "createdAt" },
      { header: "최근 접속일시", key: "loginOn" },
    ];

    //데이터 검색 START
    let where = {};
    let count = 0;
    const now = new Date();
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

    const results = await models.Account.findAll({
      raw: true,
      where: where,
      order: [["createdAt", "ASC"]], //최신순
    });

    if (results != null) {
      results.map((d) => {
        count += 1;
        worksheet.addRow({
          no: count,
          id: d.userId,
          name: d.name,
          email: d.email,
          createdAt: d.createdAt,
          loginOn: d.loginOn,
        });
      });
    }

    return await workbook.xlsx.writeBuffer();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

/**
 * 강제탈퇴회원 어드민 엑셀 다운로드
 * @param {*} req
 * @returns
 */
export const excelAccountSessionAdminDownload = async (req) => {
  try {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("강제탈퇴회원");
    worksheet.columns = [
      { header: "NO", key: "no" },
      { header: "ID", key: "id" },
      { header: "사용자명", key: "name" },
      { header: "이메일 주소", key: "email" },
      { header: "가입일시", key: "createdAt" },
      { header: "최근 접속일시", key: "loginOn" },
    ];

    //데이터 검색 START
    let where = {};
    let count = 0;
    const now = new Date();
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

    const results = await models.AccountSecession.findAll({
      raw: true,
      where: where,
      order: [["createdAt", "ASC"]], //최신순
    });

    if (results != null) {
      results.map((d) => {
        count += 1;
        worksheet.addRow({
          no: count,
          id: d.userId,
          name: d.name,
          email: d.email,
          createdAt: d.createdAt,
          loginOn: d.loginOn,
        });
      });
    }

    return await workbook.xlsx.writeBuffer();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

/**
 * 인증요청관리 엑셀 다운로드
 * @param {*} req
 * @returns
 */
export const excelAuthenticationRequestDownload = async (req) => {
  try {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("인증요청목록");
    worksheet.columns = [
      { header: "NO", key: "no" },
      { header: "요청자 ID", key: "id" },
      { header: "요청자명", key: "name" },
      { header: "요청일시", key: "createdAt" },
      { header: "처리상태", key: "status" },
      { header: "처리일시", key: "updatedAt" },
    ];

    //데이터 검색 START
    let where = {};
    let count = 0;
    const now = new Date();
    //기간 검색
    if (req?.sDate && req?.eDate) {
      if (req.searchType == "createdAt") {
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

    const results = await models.AuthenticationRequest.findAll({
      raw: true,
      where: where,
      order: [["createdAt", "ASC"]], //최신순
    });

    if (results != null) {
      results.map((d) => {
        count += 1;
        worksheet.addRow({
          no: count,
          id: d.userId,
          name: d.name,
          createdAt: d.createdAt,
          status: d.status,
          updatedAt: d.updatedAt,
        });
      });
    }

    return await workbook.xlsx.writeBuffer();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

/**
 * 신고관리목록 엑셀 다운로드
 * @param {*} req
 * @returns
 */
export const excelDeclarationDownload = async (req) => {
  try {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("인증요청목록");
    worksheet.columns = [
      { header: "NO", key: "no" },
      { header: "신고 대상", key: "type" },
      { header: "작성자 ID", key: "id" },
      { header: "작성자명", key: "name" },
      { header: "신고횟수", key: "count" },
      { header: "최초 신고일시", key: "createdAt" },
      { header: "처리상태", key: "status" },
      { header: "처리일시", key: "processingAt" },
    ];

    //데이터 검색 START
    let where = {};
    let count = 0;
    const now = new Date();
    //기간 검색
    if (req?.sDate && req?.eDate) {
      if (req.searchType == "createdAt") {
        where.createdAt = { [Op.between]: [req.sDate, req.eDate] };
      }
      if (req.searchType == "processingAt") {
        where.processing_at = { [Op.between]: [req.sDate, req.eDate] };
      }
    }

    //신고대상
    if (req?.type) {
      where.type = { [Op.eq]: req.type };
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

    const results = await models.Declaration.findAll({
      raw: true,
      where: where,
      order: [["createdAt", "ASC"]], //최신순
    });

    if (results != null) {
      results.map((d) => {
        count += 1;
        worksheet.addRow({
          no: count,
          type: d.type,
          id: d.user_id,
          name: d.user_name,
          count: d.count,
          createdAt: d.createdAt,
          status: d.status,
          processingAt: d.processing_at,
        });
      });
    }

    return await workbook.xlsx.writeBuffer();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export default {
  excelAccountAdminDownload,
  excelAccountSessionAdminDownload,
  excelAuthenticationRequestDownload,
  excelDeclarationDownload,
};

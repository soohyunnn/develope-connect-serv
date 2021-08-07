import models from "../models";
import { logger } from "../config/winston";

//댓글 신고
export const declarationComment = async (req, res) => {
  try {
    let count = 0;
    const resultAccount = await models.Account.findOne({
      where: { id: req.userId },
    });

    const resultDeclarationHistory = await models.DeclarationHistory.findAll({
      where: {
        declaration_id: req.commentId,
        type: "COMMENT",
      },
    });

    if (resultDeclarationHistory.length != 0) {
      count = resultDeclarationHistory.length;
    }

    const resultComments = await models.Comments.findOne({
      where: { id: req.commentId },
    });

    count = count + 1;

    //신고내역에 등록
    const resultDeclaration = await models.Declaration.create({
      declaration_id: req.commentId,
      content: req.content,
      created_by: req.userId,
      type: "COMMENT",
      status: "WAIT",
      count: count,
      user_id: resultAccount.dataValues.userId,
      user_name: resultAccount.dataValues.name,
      comment_content: resultComments.dataValues.content,
    });

    const resultDeclarationHistoryAdd = await models.DeclarationHistory.create({
      declaration_id: req.commentId,
      type: "COMMENT",
      content: req.content,
      user_id: resultAccount.dataValues.userId,
      user_name: resultAccount.dataValues.name,
      created_by: resultAccount.dataValues.id,
    });

    logger.info(
      `DeclarationService - declarationComment - resultDeclaration : ${JSON.stringify(
        resultDeclaration
      )}`
    );
    logger.info(
      `DeclarationService - declarationComment - resultDeclarationHistory : ${JSON.stringify(
        resultDeclarationHistoryAdd
      )}`
    );
    return resultDeclaration;
  } catch (e) {
    logger.error(
      `DeclarationService - declarationComment : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

//레터 신고
export const declarationLetter = async (req, res) => {
  try {
    let count = 0;
    const resultAccount = await models.Account.findOne({
      where: { id: req.userId },
    });

    const resultDeclarationHistory = await models.DeclarationHistory.findAll({
      where: {
        declaration_id: req.letterId,
        type: "LETTER",
      },
    });

    if (resultDeclarationHistory.length != 0) {
      count = resultDeclarationHistory.length;
    }

    const resultLetter = await models.Letter.findOne({
      where: { id: req.letterId },
    });

    count = count + 1;

    //신고내역에 등록
    const resultDeclaration = await models.Declaration.create({
      declaration_id: req.letterId,
      content: req.content,
      created_by: req.userId,
      type: "LETTER",
      status: "WAIT",
      count: count,
      user_id: resultAccount.dataValues.userId,
      user_name: resultAccount.dataValues.name,
      letter_title: resultLetter.dataValues.title,
      letter_content: resultLetter.dataValues.content,
      file_ids: resultLetter.dataValues.file_ids,
    });

    const resultDeclarationHistoryAdd = await models.DeclarationHistory.create({
      declaration_id: req.letterId,
      type: "LETTER",
      content: req.content,
      user_id: resultAccount.dataValues.userId,
      user_name: resultAccount.dataValues.name,
      created_by: resultAccount.dataValues.id,
    });

    logger.info(
      `DeclarationService - declarationLetter - resultDeclaration : ${JSON.stringify(
        resultDeclaration
      )}`
    );
    logger.info(
      `DeclarationService - declarationLetter - resultDeclarationHistory : ${JSON.stringify(
        resultDeclarationHistoryAdd
      )}`
    );
    return resultDeclaration;
  } catch (e) {
    logger.error(
      `DeclarationService - declarationLetter : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

/**
 * 신고 내역 목록 조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getDeclarationHistoryList = async (req, res) => {
  logger.info(`req : ${JSON.stringify(req)}`);
  try {
    const resultDeclarationHistory = await models.DeclarationHistory.findAll({
      where: {
        declaration_id: req.id,
        type: req.type,
        order: [["createdAt", "ASC"]], //최신순
      },
    });
    logger.info(
      `DeclarationService - getDeclarationHistoryList - resultDeclarationHistory : ${JSON.stringify(
        resultDeclarationHistory
      )}`
    );
    return resultDeclarationHistory;
  } catch (e) {
    logger.error(
      `DeclarationService - getDeclarationHistoryList : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

/**
 * 신고 처리 내역 조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getDeclarationProcessingHistoryList = async (req, res) => {
  logger.info(`req : ${JSON.stringify(req)}`);
  try {
    let pageNum = req.page;
    let offset = 0;
    let limit = 10;

    if (pageNum > 1) {
      offset = limit * (pageNum - 1);
    }

    if (req.limit != null) {
      limit = Number(req.limit);
    }
    const resultDeclarationProcessingHistory =
      await models.DeclarationProcessingHistory.findAll({
        where: {
          declaration_id: req.id,
          type: req.type,
        },
        offset: offset,
        limit: limit,
        order: [["createdAt", "ASC"]], //최신순
      });
    logger.info(
      `DeclarationService - getDeclarationProcessingHistoryList - resultDeclarationProcessingHistory : ${JSON.stringify(
        resultDeclarationProcessingHistory
      )}`
    );
    return resultDeclarationProcessingHistory;
  } catch (e) {
    logger.error(
      `DeclarationService - getDeclarationProcessingHistoryList : ${JSON.stringify(
        e
      )}`
    );
    throw e;
  }
};

//신고관리 목록 조회
export const getDeclarationList = async (req, res) => {
  logger.info(`req : ${JSON.stringify(req)}`);
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

    const count = await models.Declaration.count({
      raw: true,
      where: where,
    });

    const results = await models.Declaration.findAll({
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
        type: d.type,
        userId: d.user_id,
        userName: d.user_name,
        count: d.count,
        createdAt: d.createdAt,
        status: d.status,
        processingAt: d.processing_at, //처리일시
      });
    });
    return { data, count: count };
  } catch (e) {
    logger.error(
      `DeclarationService - getDeclarationList : ${JSON.stringify(e)}`
    );
    throw e;
  }
};

/**
 * 신고 반려
 * @param {*} params
 * @param {*} req
 * @returns
 */
export const reject = async (params, req) => {
  logger.info(
    `reject => params : ${JSON.stringify(params)} , req : ${JSON.stringify(
      req
    )}`
  );
  try {
    const resultDeclaration = await models.Declaration.findOne({
      where: { id: params.id },
    });

    if (resultDeclaration == null) {
      const e = new Error("Not Found Recode");
      e.status = 404;
      e.message = "Not Found Recode";
      throw e;
    }

    const updateDeclaration = await models.Declaration.update(
      {
        status: "REJECT",
        processing_at: new Date(),
      },
      {
        where: { id: params.id },
      }
    );

    const resultDeclarationProcessingHistory =
      await models.DeclarationProcessingHistory.create({
        declaration_id: params.id,
        status: "REJECT",
        content: req.content,
      });
    return resultDeclarationProcessingHistory;
  } catch (e) {
    console.log("e", e);
    logger.error(`DeclarationService - reject : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 신고 삭제
 * @param {*} params
 * @param {*} req
 * @returns
 */
export const remove = async (params, req) => {
  logger.info(
    `reject => params : ${JSON.stringify(params)} , req : ${JSON.stringify(
      req
    )}`
  );
  try {
    const resultDeclaration = await models.Declaration.findOne({
      where: { id: params.id },
    });

    if (resultDeclaration == null) {
      const e = new Error("Not Found Recode");
      e.status = 404;
      e.message = "Not Found Recode";
      throw e;
    }

    if (resultDeclaration.dataValues.type == "LETTER") {
      await models.Letter.update(
        {
          declaration_yn: true,
        },
        {
          where: { id: resultDeclaration.dataValues.declaration_id },
        }
      );
    }

    if (resultDeclaration.dataValues.type == "COMMENT") {
      await models.Comments.update(
        {
          declaration_yn: true,
        },
        {
          where: { id: resultDeclaration.dataValues.declaration_id },
        }
      );
    }

    if (resultDeclaration.dataValues.type == "REPLY") {
      await models.Reply.update(
        {
          declaration_yn: true,
        },
        {
          where: { id: resultDeclaration.dataValues.declaration_id },
        }
      );
    }

    const updateDeclaration = await models.Declaration.update(
      {
        status: "REMOVE",
        processing_at: new Date(),
      },
      {
        where: { id: params.id },
      }
    );

    const resultDeclarationProcessingHistory =
      await models.DeclarationProcessingHistory.create({
        declaration_id: params.id,
        status: "REMOVE",
      });
    return resultDeclarationProcessingHistory;
  } catch (e) {
    console.log("e", e);
    logger.error(`DeclarationService - reject : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 사용자별 신고내역 조회
 * @param {*} req
 * @param {*} res
 */
export const getDeclarationListByAccount = async (req, res) => {
  try {
    logger.info(`service req : ${JSON.stringify(req)}`);

    const resultAccount = await models.Account.findOne({
      where: { id: req.userId },
    });

    const resultDeclaration = await models.Declaration.findAll({
      where: { user_id: resultAccount.dataValues.userId },
    });
    return resultDeclaration;
  } catch (e) {
    console.log("e", e);
    logger.error(`DeclarationService - reject : ${e}`);
    throw e;
  }
};

export default {
  declarationLetter,
  declarationComment,
  getDeclarationHistoryList,
  getDeclarationList,
  getDeclarationProcessingHistoryList,
  reject,
  remove,
  getDeclarationListByAccount,
};

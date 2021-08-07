import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";

export const create = async (req, res) => {
  try {
    //받는사람
    const sender = await models.Account.findOne({
      where: { id: req.senderId },
    });

    //보내는 사람
    const recipient = await models.Account.findOne({
      where: { id: req.recipientId },
    });

    // console.log('sender', sender)

    // if (sender === null) {
    //   throw new Error("404", "Not Found Data!", "404");
    // }

    // if (recipient === null) {
    //   throw new Error("404", "Not Found Data!", "404");
    // }

    //해시태그 디비 저장
    const hashtag = await Promise.all(
      req.hashtag.map((h) => {
        const resultHashtag = models.Hashtag.findOne({
          where: { title: h },
        }).then((d) => {
          if (d == null) {
            models.Hashtag.create({
              title: h,
            });
          }
        });
      })
    );

    const result = await models.Letter.create({
      sender_id: sender.dataValues.id,
      recipient_id: recipient.dataValues.id,
      title: req.title,
      content: req.content,
      type: req.type,
      file_ids: req.fileIds,
      status: req.status,
      save_state: req.saveState,
      payment_amount: req.paymentAmount,
      hashtag: JSON.stringify(req.hashtag), //해시태그 추가(최대 10개)
      declaration_yn: false,
      reply_yn: false,
      read_yn: false,
      comment_count: 0,
      like_count: 0,
      share_count: 0,
      sent_delete_yn: false,
      received_delete_yn: false,
    });

    //답변의 경우
    if (req.letterId != null) {
      //해당 레터에 답변한 레터를 update 해주어야 함
      models.Letter.update(
        {
          //데이터
          reply_letter_id: result.dataValues.id,
          reply_yn: true,
        },
        {
          // 조건
          where: { id: req.letterId },
        }
      );
    }

    // console.log("result", result);
    return result.dataValues;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

/**
 * 레터 전체조회
 * @param {*} params
 * @param {*} res
 * @returns
 */
export const findAll = async (params, res) => {
  const where = {};
  console.log("params.getter", params.getter);

  try {
    if (params.getter == null || params.getter == "") {
      params.getter = 0;
    }
    const results = await models.Letter.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            [Op.and]: {
              sender_id: params.getter,
            },
          },
          {
            [Op.and]: {
              recipient_id: params.getter,
              received_delete_yn: false,
              // sent_delete_yn: false,
            },
          },
          // { sender_id: params.getter },
          // { recipient_id: params.getter },
        ],
        [Op.and]: [
          { status: true },
          // {
          //   [Op.or]: {
          //     sent_delete_yn: false,
          //     received_delete_yn: false,
          //   },
          // },
        ],
      },
      order: [
        ["reply_yn", "ASC"],
        ["createdAt", "DESC"],
      ], //답변안하고 최신 순
    });

    const searchLettters = await Promise.all(
      results.map((d) => {
        return models.Letter.findOne({
          where: { id: d.id },
        });
      })
    );

    const searchLettterResults = await Promise.all(
      searchLettters.map(async (d) => {
        // let test = {}

        const recipient = await models.Account.findOne({
          where: { id: d.recipient_id },
        });

        const sender = await models.Account.findOne({
          where: { id: d.sender_id },
        });

        // console.log('1111', d.dataValues)

        const fileId = d.dataValues.file_ids[0]; //첫번째 파일을 기준으로 썸네일 결정
        const { dataValues } = await models.Files.findOne({
          where: { id: fileId },
        });
        // console.log("2222", dataValues);

        let thumbnailId;
        //첫번째 파일이 이미지일 경우
        if (dataValues.thumbnailId == null) {
          thumbnailId = dataValues.id;
        }
        //첫번째 파일이 영상일 경우
        if (dataValues.thumbnailId != null) {
          thumbnailId = dataValues.thumbnailId;
        }

        const fileInfoList = await Promise.all(
          d.dataValues.file_ids.map(async (f) => {
            const { dataValues } = await models.Files.findOne({
              where: { id: f },
            });

            return {
              id: dataValues.id,
              contentType: dataValues.content_type,
            };
          })
        );

        return {
          id: d.id,
          title: d.title,
          content: d.content,
          senderUser: {
            id: sender.dataValues.id,
            imageId: sender.dataValues.imageId,
            userId: sender.dataValues.userId,
            name: sender.dataValues.name,
          },
          recipientUser: {
            id: recipient.dataValues.id,
            imageId: recipient.dataValues.imageId,
            userId: recipient.dataValues.userId,
            name: recipient.dataValues.name,
          },
          createdAt: d.createdAt,
          replyYn: d.reply_yn,
          readYn: d.read_yn,
          status: d.status,
          fileIds: d.file_ids,
          thumbnailId: thumbnailId,
          fileInfoList: fileInfoList,
        };
      })
    );

    logger.info(`레터조회 data ${JSON.stringify(searchLettterResults)}`);
    return searchLettterResults;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 해시태그로 레터 목록 조회
 * @param {*} params
 */
export const findAllByHashtag = async (params) => {
  console.log("req", params);
  const where = {};
  if (params?.keyword) {
    where.hashtag = { [Op.like]: "%" + params.keyword + "%" };
  }

  try {
    const resultLetter = await models.Letter.findAll({
      raw: true,
      where: where,
    });
    return resultLetter;
  } catch (e) {
    logger.error(`e : ${e}`);
    throw e;
  }
};

/**
 * 레터 상세조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const detail = async (req, query, res) => {
  try {
    const where = {};
    //레터 상세조회
    if (req?.id) {
      where.id = { [Op.eq]: req.id };
      // where.save_state = { [Op.eq]: true };
    }

    const letterList = await models.Letter.findAll({
      raw: true,
      where: { sender_id: query.userID },
      order: [
        ["reply_yn", "ASC"],
        ["createdAt", "DESC"],
      ], //답변안하고 최신 순
    });

    var arr = new Array();
    let i = 0;
    letterList.map((m) => {
      arr[i] = m.id;
      i++;
    });

    let j = 0;
    var resultId = new Array();
    arr.map((d) => {
      if (d == req.id) {
        if (arr[j - 1] != null) {
          resultId[0] = arr[j - 1];
        } else {
          resultId[0] = null;
        }
        resultId[1] = d;
        if (arr[j + 1] != null) {
          resultId[2] = arr[j + 1];
        } else {
          resultId[2] = null;
        }
      }
      j++;
    });

    const letterLike = await models.LetterLikes.findOne({
      where: {
        letter_id: req.id,
        user_id: query.userID,
      },
    });

    const letterLikeCount = await models.LetterLikes.findAll({
      where: {
        letter_id: req.id,
      },
    });

    const result = await models.Letter.findOne({ where: where });

    const commentCount = await models.Comments.findAll({
      where: { letter_id: req.id },
    });
    result.dataValues.comment_count = commentCount.length;

    const reply = await models.Reply.findOne({
      where: { id: result.dataValues.reply_letter_id },
    });

    if (query.userID != null && result.dataValues.sender_id === query.userID) {
      const data = await models.Letter.update(
        {
          //데이터
          read_yn: true,
        },
        {
          // 조건
          where: { id: req.id },
        }
      );
    }

    const fileInfoList = await Promise.all(
      result.file_ids.map(async (f) => {
        const { dataValues } = await models.Files.findOne({ where: { id: f } });

        if (dataValues.thumbnailId != null) {
          result.dataValues.thumbnailId = dataValues.thumbnailId;
        }

        return {
          id: dataValues.id,
          contentType: dataValues.content_type,
        };
      })
    );

    if (letterLike != null) {
      result.dataValues.likeYn = true;
    } else {
      result.dataValues.likeYn = false;
    }

    const sender = await models.Account.findOne({
      where: { id: result.dataValues.sender_id },
    });

    const recipient = await models.Account.findOne({
      where: { id: result.dataValues.recipient_id },
    });

    result.dataValues.prevLetterId = resultId[0];
    result.dataValues.nextLetterId = resultId[2];

    result.dataValues.senderUser = {
      id: sender.dataValues.id,
      userId: sender.dataValues.userId,
      name: sender.dataValues.name,
      imageId: sender.dataValues.representativeImage,
    };
    result.dataValues.recipientUser = {
      id: recipient.dataValues.id,
      userId: recipient.dataValues.userId,
      name: recipient.dataValues.name,
      imageId: recipient.dataValues.representativeImage,
    };

    if (reply != null) {
      result.dataValues.reply = reply.dataValues;
      delete result.dataValues.reply.sender_id;
      delete result.dataValues.reply.recipient_id;
      result.dataValues.reply.senderUser = result.dataValues.recipientUser;
      result.dataValues.reply.recipientUser = result.dataValues.senderUser;
    } else {
      result.dataValues.reply = null;
    }

    result.dataValues.fileInfoList = fileInfoList;

    return result;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 레터 숨기기
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateStatus = async (req, res) => {
  try {
    const result = await models.Letter.update(
      {
        //데이터
        status: false,
      },
      {
        // 조건
        where: { id: req.id },
      }
    );
    return "200";
  } catch (e) {
    console.log(e);
  }
};

/**
 * 레터 좋아요
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const letterLikes = async (req, res) => {
  // const result11 = await models.Account.findOne({
  //   where: { id: req.userId },
  // });

  const letter = await models.Letter.findOne({
    where: { id: req.letterId },
  });

  //해당 레터 좋아요 카운터 수 올리기
  await models.Letter.update(
    {
      //데이터
      like_count: letter.dataValues.like_count + 1,
    },
    {
      // 조건
      where: { id: req.letterId },
    }
  );

  try {
    const result = await models.LetterLikes.create({
      letter_id: req.letterId,
      letter_sender_id: letter.dataValues.sender_id,
      letter_recipient_id: letter.dataValues.recipient_id,
      user_id: req.userId,
    });
    return result.dataValues;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 레터 좋아요 취소
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const letterCancelLikes = async (req, res) => {
  try {
    const result = await models.LetterLikes.destroy({
      where: { letter_id: req.letterId, user_id: req.userId },
    });

    const letter = await models.Letter.findOne({
      where: { id: req.letterId },
    });

    //해당 레터 좋아요 카운터 수 올리기
    const deleteCandelLike = await models.Letter.update(
      {
        //데이터
        like_count: letter.dataValues.like_count - 1,
      },
      {
        // 조건
        where: { id: req.letterId },
      }
    );

    if (deleteCandelLike == 1) {
      return "200";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 댓글 등록!
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createComments = async (req, res) => {
  const { dataValues } = await models.Account.findOne({
    where: { id: req.userId },
  });

  try {
    const result = await models.Comments.create({
      letter_id: req.letterId,
      content: req.content,
      status: false,
      user_id: dataValues.id,
      like_count: 0,
      declaration_yn: false,
    });
    return result.dataValues;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 댓글 수정
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateComments = async (req, body, res) => {
  try {
    const result = await models.Comments.update(
      {
        content: body.content,
      },
      {
        where: { id: req.id },
      }
    );
    console.log("result", result);
    return result;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 댓글 삭제
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteComments = async (req, body, res) => {
  try {
    const commentDelete = await models.Comments.destroy({
      where: { id: req.id },
    });

    const replyCommentDelete = await models.ReplyComments.findAll({
      where: { comment_id: req.id },
    });

    if (replyCommentDelete != null) {
      const commentList = await Promise.all(
        replyCommentDelete.map(async (r) => {
          await models.ReplyComments.destroy({
            where: { comment_id: r.id },
          });
        })
      );
    }

    return "200";
  } catch (e) {
    console.log(e);
  }
};

/**
 * 댓글 목록조회
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const findAllComments = async (req, res) => {
  try {
    let count = 0;
    const result = await models.Comments.findAll({
      where: { letter_id: req.letterId },
      offset: Number(req.offset),
      limit: Number(req.limit),
      order: [["createdAt", "ASC"]], //최신순
    });

    const commentList = await Promise.all(
      result.map(async (d) => {
        count += 1;
        const data = await models.ReplyComments.findAll({
          where: { comment_id: d.dataValues.id },
        });

        const replyComment = await Promise.all(
          data.map(async (d) => {
            count += 1;
            const replyCommentAccount = await models.Account.findOne({
              where: { id: d.user_id },
            });
            delete d.dataValues.user_id;
            d.dataValues.user = {
              id: replyCommentAccount.dataValues.id,
              userId: replyCommentAccount.dataValues.userId,
              imageId: replyCommentAccount.dataValues.imageId,
            };

            return d.dataValues;
          })
        );

        const commentLike = await models.CommentLikes.findOne({
          where: { comment_id: d.dataValues.id, user_id: req.userId },
        });

        console.log("commentLike", commentLike);

        if (commentLike != null) {
          d.dataValues.likeYn = true;
        } else {
          d.dataValues.likeYn = false;
        }

        const account = await models.Account.findOne({
          where: { id: d.user_id },
        });
        delete d.dataValues.user_id;
        d.dataValues.user = {
          id: account.dataValues.id,
          userId: account.dataValues.userId,
          name: account.dataValues.name,
        };
        d.dataValues.replyComment = replyComment;
      })
    );
    if (result != null) {
      return { data: result, count };
    } else {
      return "";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 대댓글 등록
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createReplyComments = async (req, res) => {
  const { dataValues } = await models.Account.findOne({
    where: { id: req.userId },
  });

  try {
    const result = await models.ReplyComments.create({
      letter_id: req.letterId,
      comment_id: req.commentId,
      content: req.content,
      status: false,
      user_id: req.userId,
    });
    return result.dataValues;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 대댓글 수정
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateReplyComments = async (req, body, res) => {
  try {
    const result = await models.ReplyComments.update(
      {
        content: body.content,
      },
      {
        where: { id: req.id },
      }
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 대댓글 삭제
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteReplyComments = async (req, body, res) => {
  console.log("req", req);
  try {
    const result = await models.ReplyComments.destroy({
      where: { id: req.id },
    });
    console.log("result", result);
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 유저상세 - 받은 레터 , 보낸레터, 좋아요 레터 목록 조회
 * @param {*} params
 * @param {*} res
 * @returns
 */
export const findUserDeailLetterAll = async (params, res) => {
  const getFileRetunData = (d, AccountData, fileData) => {
    return {
      id: d.id,
      title: d.title,
      content: d.content,
      senderUser: {
        id: d.sender_id,
        imageId: AccountData.sender.imageId,
        userId: AccountData.sender.userId,
        name: AccountData.sender.name,
      },
      recipientUser: {
        id: d.sender_id,
        imageId: AccountData.recipient.imageId,
        userId: AccountData.recipient.userId,
        name: AccountData.recipient.name,
      },
      createdAt: d.createdAt,
      replyYn: d.reply_yn,
      readYn: d.read_yn,
      status: d.status,
      fileIds: d.file_ids,
      thumbnailId: fileData.thumbnailId,
      fileInfoList: fileData.fileInfoList,
    };
  };

  const fileData = {
    thumbnailId: null,
    fileInfoList: null,
  };

  try {
    //받은 레터 목록 조회
    const setterLetters = await models.Letter.findAll({
      raw: true,
      where: { recipient_id: params.id, received_delete_yn: false },
    });

    const setterLetterResults = await Promise.all(
      setterLetters.map(async (d) => {
        const AccountData = await getAccount(d);

        if (d.file_ids.length != 0) {
          const fileData2 = await searchFile(d.file_ids);
          fileData.thumbnailId = fileData2.thumbnailId;
          fileData.fileInfoList = fileData2.fileInfoList;
        }

        return getFileRetunData(d, AccountData, fileData);
      })
    );

    //보낸 레터 목록 조회
    const getterLetters = await models.Letter.findAll({
      raw: true,
      where: { sender_id: params.id, sent_delete_yn: false },
    });

    const getterLetterResults = await Promise.all(
      getterLetters.map(async (d) => {
        const AccountData = await getAccount(d);

        if (d.file_ids.length != 0) {
          const fileData2 = await searchFile(d.file_ids);
          fileData.thumbnailId = fileData2.thumbnailId;
          fileData.fileInfoList = fileData2.fileInfoList;
        }

        return getFileRetunData(d, AccountData, fileData);
      })
    );

    //좋아요 한 레터 목록
    const likeLetters = await models.LetterLikes.findAll({
      raw: true,
      where: { user_id: params.id },
    });

    const searchLettters = await Promise.all(
      likeLetters.map((d) => {
        return models.Letter.findOne({
          where: { id: d.letter_id },
        });
      })
    );

    const searchLettterResults = await Promise.all(
      searchLettters.map(async (d) => {
        const AccountData = await getAccount(d);

        if (d.file_ids.length != 0) {
          const fileData2 = await searchFile(d.file_ids);
          fileData.thumbnailId = fileData2.thumbnailId;
          fileData.fileInfoList = fileData2.fileInfoList;
        }

        return getFileRetunData(d, AccountData, fileData);
      })
    );

    return {
      data: {
        setterLetters: setterLetterResults,
        getterLetters: getterLetterResults,
        likeLetters: searchLettterResults,
      },
    };
  } catch (e) {
    console.log(e);
  }
};

/**
 * 레터 공유수 증가
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const letterShare = async (req, res) => {
  try {
    const letter = await models.Letter.findOne({
      where: { id: req.letterId },
    });

    //해당 레터 좋아요 카운터 수 올리기
    const result = await models.Letter.update(
      {
        //데이터
        share_count: letter.dataValues.share_count + 1,
      },
      {
        // 조건
        where: { id: req.letterId },
      }
    );
    if (result == 1) {
      return "200";
    }
    // return result.dataValues;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 레터 삭제
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteLetter = async (req, body, res) => {
  console.log("req", req, "  ", body);

  // let data = {};
  // if (body.letterType == "SEND") {
  //   data = { sent_delete_yn: true };
  // }

  // if (body.letterType == "RECEIVE") {
  //   data = { received_delete_yn: true };
  // }

  // console.log("data", data);

  try {
    const letter = await models.Letter.findOne({
      where: { id: req.id },
    });

    console.log("letter", letter.dataValues);

    if (letter != null) {
      //받은 레터일 경우
      if (letter.dataValues.sender_id == req.userId) {
        const result = await models.Letter.update(
          {
            received_delete_yn: true,
          },
          {
            where: { id: req.id },
          }
        );
      }
      //보낸 레터일 경우
      if (letter.dataValues.recipient_id == req.userId) {
        const result = await models.Letter.update(
          {
            received_delete_yn: true,
          },
          {
            where: { id: req.id },
          }
        );
      }
    }

    return "200";
  } catch (e) {
    console.log(e);
  }
};

const searchFile = async (fileIds) => {
  const fileId = fileIds[0];
  const { dataValues } = await models.Files.findOne({
    where: { id: fileId },
  });

  let thumbnailId;
  //첫번째 파일이 이미지일 경우
  if (dataValues.thumbnailId == null) {
    thumbnailId = dataValues.id;
  }
  //첫번째 파일이 영상일 경우
  if (dataValues.thumbnailId != null) {
    thumbnailId = dataValues.thumbnailId;
  }

  const fileInfoList = await Promise.all(
    fileIds.map(async (f) => {
      const { dataValues } = await models.Files.findOne({
        where: { id: f },
      });

      return {
        id: dataValues.id,
        contentType: dataValues.content_type,
      };
    })
  );

  return {
    thumbnailId: thumbnailId,
    fileInfoList: fileInfoList,
  };
};

const getAccount = async (data) => {
  const recipient = await models.Account.findOne({
    where: { id: data.recipient_id },
  });

  const sender = await models.Account.findOne({
    where: { id: data.sender_id },
  });
  return {
    sender: sender.dataValues,
    recipient: recipient.dataValues,
  };
};

export default {
  create,
  findAll,
  detail,
  updateStatus,
  letterLikes,
  createComments,
  findUserDeailLetterAll,
  findAllComments,
  updateComments,
  createReplyComments,
  updateReplyComments,
  deleteReplyComments,
  letterCancelLikes,
  letterShare,
  deleteLetter,
  deleteComments,
  findAllByHashtag,
};

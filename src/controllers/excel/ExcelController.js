import { logger } from "../../config/winston";
import {
  excelAccountAdminDownload,
  excelAccountSessionAdminDownload,
  excelAuthenticationRequestDownload,
  excelDeclarationDownload,
} from "../../service/ExcelService";

export const accountAdminExcel = async (req, res, next) => {
  logger.info(
    `관리자 회원관리 엑셀 다운로드 => query : ${JSON.stringify(req.query)}`
  );
  excelAccountAdminDownload(req.query)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const accountSecessionAdminExcel = async (req, res, next) => {
  logger.info(
    `관리자 강제탈퇴회원 엑셀 다운로드 => query : ${JSON.stringify(req.query)}`
  );
  excelAccountSessionAdminDownload(req.query)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const AuthenticationRequestExcel = async (req, res, next) => {
  logger.info(
    `관리자 인증요청목록 엑셀 다운로드 => query : ${JSON.stringify(req.query)}`
  );
  excelAuthenticationRequestDownload(req.query)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const DeclarationExcel = async (req, res, next) => {
  logger.info(
    `관리자 신고관리목록 엑셀 다운로드 => query : ${JSON.stringify(req.query)}`
  );
  excelDeclarationDownload(req.query)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export default {
  accountAdminExcel,
  accountSecessionAdminExcel,
  AuthenticationRequestExcel,
  DeclarationExcel,
};

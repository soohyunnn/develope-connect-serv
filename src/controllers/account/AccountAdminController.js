// import { logger } from "../../config/winston";

// export const findAll = async (req, res, next) => {
//   logger.info(`관리자 - 회원 목록 조회 ${JSON.stringify(req.query)}`);
//   await getAll(req.query)
//     .then((d) => {
//       logger.info(`result Data : ${JSON.stringify(d)}`);
//       res.status(200).send(d);
//     })
//     .catch((e) => {
//       logger.error(`error : ${JSON.stringify(e)}`);
//       res.status(500).send("Server Error");
//     });
// };

// export const findOne = async (req, res, next) => {
//   logger.info(`관리자 - 회원 상세 조회 ${JSON.stringify(req.params)}`);
//   await getOne(req.params)
//     .then((d) => {
//       logger.info(`result Data : ${JSON.stringify(d)}`);
//       res.status(200).send(d);
//     })
//     .catch((e) => {
//       // if (e.status == "404") {
//       //   res.status(404).send("Not Found Recode");
//       // }
//       logger.error(`error : ${JSON.stringify(e)}`);
//       res.status(500).send("Server Error");
//     });
// };

// export const findAllSecession = async (req, res, next) => {
//   logger.info(`관리자 - 강제탈퇴회원 목록 조회 ${JSON.stringify(req.query)}`);
//   await getAllSecession(req.query)
//     .then((d) => {
//       logger.info(`result Data : ${JSON.stringify(d)}`);
//       res.status(200).send(d);
//     })
//     .catch((e) => {
//       logger.error(`error : ${JSON.stringify(e)}`);
//       res.status(500).send("Server Error");
//     });
// };

// export const findOneSecession = async (req, res, next) => {
//   logger.info(`관리자 - 강제탈퇴회원 상세 조회 ${JSON.stringify(req.params)}`);
//   await getOneSecession(req.params)
//     .then((d) => {
//       logger.info(`result Data : ${JSON.stringify(d)}`);
//       res.status(200).send(d);
//     })
//     .catch((e) => {
//       // if (e.status == "404") {
//       //   res.status(404).send("Not Found Recode");
//       // }
//       logger.error(`error : ${JSON.stringify(e)}`);
//       res.status(500).send("Server Error");
//     });
// };

// export const compulsionSecession = async (req, res, next) => {
//   logger.info(`회원 탈퇴 => params: ${JSON.stringify(req.params)}, body: `);
//   await secession(req.params, req.body)
//     .then((d) => {
//       logger.info(`result Data : ${JSON.stringify(d)}`);
//       res.status(200).send(d);
//     })
//     .catch((e) => {
//       // if (e.status == "404") {
//       //   res.status(404).send("Not Found Recode");
//       // }
//       logger.error(`error : ${JSON.stringify(e)}`);
//       res.status(500).send("Server Error");
//     });
// };

// export default {
//   findAll,
//   findOne,
//   findAllSecession,
//   findOneSecession,
//   compulsionSecession,
// };

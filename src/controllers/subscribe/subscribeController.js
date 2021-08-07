import {
  create,
  cancleSubscribe,
  findAll,
} from "../../service/subscribeService";

export const execute = async (req, res, next) => {
  console.log("팬 등록 시작");
  const result = await create(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const searchSubsribeCancel = async (req, res, next) => {
  console.log("팬 취소");
  const result = await cancleSubscribe(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const searchSubsribe = async (req, res, next) => {
  const result = await findAll(req.query);
  console.log("결과는!!!", result);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export default { execute, searchSubsribeCancel, searchSubsribe };

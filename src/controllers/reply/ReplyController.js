import { create } from "../../service/ReplyService";

export const createReply = async (req, res, next) => {
  const result = await create(req.body);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export default {
  createReply,
};

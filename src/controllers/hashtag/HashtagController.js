import { searchHashtag } from "../../service/HashtagService";
import { logger } from "../../config/winston";

export const findAllHashtag = async (req, res, next) => {
  logger.info(`해시태그 검색 => ${JSON.stringify(req.query)}`);
  searchHashtag(req.query)
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
  findAllHashtag,
};

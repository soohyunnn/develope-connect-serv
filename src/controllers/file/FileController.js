import {getThumbnail} from "./ffmpeg"

export const createThumbnail = async (req,res, next) => {
  const result = await getThumbnail(req.body.path);
  res.json(result);
}

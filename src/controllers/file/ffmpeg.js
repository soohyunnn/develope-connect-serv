// // const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
// import ffmpeg from "fluent-ffmpeg";
// import ffprobe from "ffprobe-static";
// import { logger } from "../../config/winston";

// // const ffmpeg = require("fluent-ffmpeg");
// // var ffprobe = require("ffprobe-static");
// ffmpeg.setFfprobePath(ffprobe.path);

// const getThumbnail = async (req, res) => {
//   let thumbsFilePath = "";
//   let fileDuration = "";

//   // 비디오 전체 정보 추출
//   ffmpeg.ffprobe(req, function (err, metadata) {
//     fileDuration = metadata.format.duration;
//     logger.info(`Metadata : ${JSON.stringify(metadata)}`);
//   });

//   //썸네일 생성, 비디오 길이 추출
//   const result = ffmpeg(req)
//     .on("filenames", function (filenames) {
//       // console.log("Will generate " + filenames.join(", "));
//       thumbsFilePath = "../uploads/thumbnails/" + filenames[0];
//     })
//     .on("end", function () {
//       return {
//         success: true,
//         thumbsFilePath: thumbsFilePath,
//         fileDuration: fileDuration,
//       };
//     })
//     .on("error", function (err) {
//       console.error("err", err);
//       return { err: err };
//     })
//     .screenshots({
//       // Will take screens at 20%, 40%, 60% and 80% of the video
//       count: 1,
//       folder: "../uploads/thumbnails",
//       size: "320x200",
//       // %b input basename ( filename w/o extension )
//       filename: "thumbnail-%b.png",
//     });

//   return result;
// };

// module.exports = {
//   getThumbnail,
// };

/**
 * 회원관리
 */
import {
  execute,
  // searchAccounts,
  // updateAccounts,
  // datilsAccounts,
  // secessionAccounts,
  // idDuplicateCheck,
  // searchUserId,
  // updateInstagramAccount,
  // updateFacebookAccount,
  // updateYoutubeAccount,
  // updateAccountInfo,
  // updateEmail,
  // updatePassword,
  // checkAccountPassword,
  // deleteImageIdAccount,
  // accountImageSetup,
  // saveAccountImages,
  // deleteAccountImage,
  // checkCode,
  // emailUserJoin,
  // emailUserJoinCheck,
  // getPushList,
  // updatePushStatus,
  // updateDoNotDisturbTime,
  // updateDormancy,
} from "./AccountController";

import { kakao, facebook, naver, google, apple } from "./OauthController";
import { Router } from "express";
const router = Router();

//사용자 앱
// router.get("/findAll", searchAccounts);

router.post("/", execute);

// router.put("/update/:id", updateAccounts);

// router.get("/details/:id", datilsAccounts);

// router.delete("/secession/:id", secessionAccounts);

// router.post("/kakaoLogin", kakao);

// router.post("/facebookLogin", facebook);

// router.post("/naverLogin", naver);

// router.post("/googleLogin", google);

// router.post("/appleLogin", apple);

// router.get("/idDuplicate/:userId", idDuplicateCheck); //아이디 중복 확인

// router.get("/searchUserId/:email", searchUserId); //아이디 찾기

// router.put("/updateInstagramAccount/:id", updateInstagramAccount); //인스타 SNS 연동

// router.put("/updateFacebookAccount/:id", updateFacebookAccount); //페이스북 SNS 연동

// router.put("/updateYoutubeAccount/:id", updateYoutubeAccount); //유튜브 SNS 연동

// router.put("/updateAccountInfo/:id", updateAccountInfo); //회원 수정

// router.put("/updateEmail/:id", updateEmail); //회원 이메일 수정

// router.put("/updatePassword", updatePassword); //회원 이메일 수정

// router.post("/checkPassword", checkAccountPassword); //회원 비밀번호 확인 체크

// router.post("/deleteImageId", deleteImageIdAccount); //회원 프로필 삭제

// router.put("/accountImageSetup/:id", accountImageSetup); //회원 대표 프로필 설정

// router.put("/saveAccountImages/:id", saveAccountImages); //회원 프로필 이미지 등록

// router.delete("/deleteAccountImage/:id", deleteAccountImage); //회원 프로필 이미지 삭제

// router.get("/checkCode", checkCode);

// router.post("/emailUserJoin", emailUserJoin); //이메일로 회원가입

// router.post("/emailUserJoinCheck", emailUserJoinCheck); //이메일로 회원가입 인증코드 체크 후 회원가입 처리

// router.get("/push", getPushList); //푸시 알람/방해금지모두 상태 조회(리스트)

// router.put("/push/:id", updatePushStatus); //푸시 알람/방해금지모드 업데이트

// router.put("/doNotDisturb/:id", updateDoNotDisturbTime); //방해금지모드 시간대 설정

// router.put("/dormancy/:id", updateDormancy); //휴면설정

// //어드민
// router.get("/admin", findAll); //회원 목록 조회

// router.get("/admin/:id", findOne); //회원 상세 조회

// router.get("/secession/admin", findAllSecession); //강제탈퇴회원 목록 조회

// router.get("/secession/admin/:id", findOneSecession); //강제탈퇴회원 상세 조회

// router.delete("/compulsionSecession/:id", compulsionSecession); //강제회원탈퇴

module.exports = router;

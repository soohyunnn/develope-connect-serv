const options = {
  //swagger문서 설정
  swagger: "2.0",
  info: {
    title: "DEVELOPER-CONNECT API",
    version: "1.0.0",
    description: "Test API with express",
  },
  servers: { url: "13.58.29.54:7000" },
  host: "13.58.29.54:7000",
  // servers: { url: "localhost:7000" },
  // host: "localhost:7000",
  basePath: "/",
  swaggerDefinition: {},
  tags: {
    name: "회원",
  },
  //swagger api가 존재하는 곳 입니다.
  apis: ["./controllers/*.js"],
  paths: {
    "/api/account/findAll": {
      get: {
        tags: ["회원"],
        summary: "회원 목록 조회",
        description: "path:: /account",
        parameters: [
          {
            name: "userId",
            in: "query",
            required: false,
            description: "아이디",
            schema: {
              type: "String",
            },
          },
          {
            name: "name",
            in: "query",
            required: false,
            description: "이름",
            schema: {
              type: "String",
            },
          },
          {
            name: "email",
            in: "query",
            required: false,
            description: "이메일",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "번호",
                },
                userId: {
                  type: "string",
                  description: "아이디",
                },
                password: {
                  type: "string",
                  description: "비밀번호",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
                createdAt: {
                  type: "string",
                  description: "작성 날짜",
                },
                updatedAt: {
                  type: "string",
                  description: "수정 날짜",
                },
                loginOn: {
                  type: "string",
                  description: "마지막 접속 날짜",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                    },
                    userId: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    updatedAt: {
                      type: "string",
                    },
                    loginOn: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/account": {
      post: {
        tags: ["회원"],
        summary: "회원 등록",
        description:
          "<p><b>path:: /api/account</b></p>" +
          "<p><b>userId</b> : 사용자 아이디</p>" +
          "<p><b>password</b> : 사용자 비밀번호</p>" +
          "<p><b>email</b> : 사용자 이메일</p>" +
          "<p><b>name</b> : 사용자 이름</p>" +
          "<p><b>serviceAgree</b> : 서비스 이용 약관 동의</p>" +
          "<p><b>informationAgree</b> : 개인정보 수집 이용 동의</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                userId: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                serviceAgree: {
                  type: "boolean",
                },
                informationAgree: {
                  type: "boolean",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/emailUserJoin": {
      post: {
        tags: ["회원"],
        summary: "이메일로 회원가입",
        description:
          "<p>path:: /api/account/emailUserJoin</p>" +
          "<p><b>password</b> : 회원의 현재 비밀번호</p>" +
          "<p><b>userId</b> : 로그인한 사용자 ID</p>" +
          "<p>true : 일치, false : 불일치</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                userId: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/emailUserJoinCheck": {
      post: {
        tags: ["회원"],
        summary: "이메일로 회원가입 인증코드 체크 후 회원가입 처리",
        description:
          "<p>path:: /api/account/emailUserJoinCheck</p>" +
          "<p><b>code</b> : 인증코드</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                code: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/details/{id}": {
      get: {
        tags: ["회원"],
        summary: "회원 상세조회",
        description: "path:: /details/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "userId",
            in: "query",
            required: false,
            description: "현재로그인한 사용자 Id",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/updateAccountInfo/{id}": {
      put: {
        tags: ["회원"],
        summary: "회원 수정",
        description: "path:: /api/account/updateAccountInfo/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                name: {
                  type: "string",
                },
                statusMessage: {
                  type: "string",
                },
                imageId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/saveAccountImages/{id}": {
      put: {
        tags: ["회원"],
        summary: "회원 프로필 이미지 등록",
        description: "path:: /api/account/saveAccountImages/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            description: "body",
            schema: {
              properties: {
                imageId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/accountImageSetup/{id}": {
      put: {
        tags: ["회원"],
        summary: "회원 대표이미지 수정",
        description: "path:: /api/account/accountImageSetup/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                representativeImage: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/deleteAccountImage/{id}": {
      delete: {
        tags: ["회원"],
        summary: "회원 프로필 이미지 삭제",
        description: "path:: /api/account/deleteAccountImage/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                imageId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/updateEmail/{id}": {
      put: {
        tags: ["회원"],
        summary: "회원 이메일 수정",
        description: "path:: /api/account/updateEmail/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                email: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/checkPassword": {
      post: {
        tags: ["회원"],
        summary: "비밀번호 확인 체크",
        description:
          "<p>path:: /api/account/checkPassword</p>" +
          "<p><b>password</b> : 회원의 현재 비밀번호</p>" +
          "<p><b>userId</b> : 로그인한 사용자 ID</p>" +
          "<p>true : 일치, false : 불일치</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                password: {
                  type: "string",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    // "/api/account/deleteImageId": {
    //   post: {
    //     tags: ["회원"],
    //     summary: "회원 프로필 이미지 삭제",
    //     description:
    //       "<p>path:: /api/account/deleteImageId</p>" +
    //       "<p><b>imageId</b> : 이미지 고유 ID</p>" +
    //       "<p><b>userId</b> : 로그인한 사용자 ID</p>",
    //     produces: "applicaion/json",
    //     parameters: [
    //       {
    //         name: "body",
    //         in: "body",
    //         required: true,
    //         description: "body",
    //         schema: {
    //           properties: {
    //             imageId: {
    //               type: "integer",
    //             },
    //             userId: {
    //               type: "integer",
    //             },
    //           },
    //         },
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: "OK",
    //         message: "OK",
    //       },
    //     },
    //   },
    // },
    "/api/account/updatePassword": {
      put: {
        tags: ["회원"],
        summary: "회원 비밀번호 수정",
        description: "path:: /api/account/updatePassword",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                password: {
                  type: "string",
                },
                accessToken: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/idDuplicate/{userId}": {
      get: {
        tags: ["회원"],
        summary: "아이디 중복 확인",
        description: "path:: /idDuplicate/{userId}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            description: "userId",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/searchUserId/{email}": {
      get: {
        tags: ["회원"],
        summary: "아이디 찾기",
        description: "path:: /searchUserId/{email}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "email",
            in: "path",
            required: true,
            description: "email",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/update/{id}": {
      put: {
        tags: ["회원"],
        summary: "비밀번호 수정",
        description: "path:: /account/update/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                password: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/updateInstagramAccount/{id}": {
      put: {
        tags: ["회원"],
        summary: "인스타 SNS 계정 연동",
        description: "path:: /account/updateInstagramAccount/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                instagramAccount: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/updateFacebookAccount/{id}": {
      put: {
        tags: ["회원"],
        summary: "페이스북 SNS 계정 연동",
        description: "path:: /account/updateFacebookAccount/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                facebookAccount: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/updateYoutubeAccount/{id}": {
      put: {
        tags: ["회원"],
        summary: "유튜브 SNS 계정 연동",
        description: "path:: /account/updateYoutubeAccount/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                youtubeAccount: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/secession/{id}": {
      delete: {
        tags: ["회원"],
        summary: "회원 탈퇴",
        description:
          "<p><b>path:: /api/account/secession/{id}</b></p>" +
          "<p><b>id</b>: 회원 고유 ID</p>" +
          "<p><b>reasonForWithdrawal</b>: 탈퇴 사유</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                reasonForWithdrawal: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/push": {
      get: {
        tags: ["회원"],
        summary: "푸시 알람/방해금지모두 상태 조회(리스트)",
        description: "path:: /api/account/push",
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            description: "사용자 고유ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/push/{id}": {
      put: {
        tags: ["회원"],
        summary: "푸시 알람/방해금지모드 업데이트",
        description:
          "path:: /api/account/push/{id}\n" +
          "<p><b>type</b> : 푸시알람 상태 변경 타입 </p>" +
          "<p><b>receiveNewLetter</b> : 신규 레터 수신</p>" +
          "<p><b>receiveReply</b> : 답장 수신</p>" +
          "<p><b>commentNotifications</b> : 댓글 알림</p>" +
          "<p><b>likeNotifications</b> : 좋아요 알림</p>" +
          "<p><b>doNotDisturb</b> : 방해금지모드</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "회원 고유 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                type: {
                  type: "string",
                },
                status: {
                  type: "boolean",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/doNotDisturb/{id}": {
      put: {
        tags: ["회원"],
        summary: "방해금지모드 시간대 설정",
        description:
          "path:: /api/account/doNotDisturb/{id}\n" +
          "<p><b>doNotDisturbStartTime</b> : 시작시간 (24시간 설정으로 보내기)</p>" +
          "<p><b>doNotDisturbEndTime</b> : 종료시간 (24시간 설정으로 보내기)</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "회원 고유 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                doNotDisturbStartTime: {
                  type: "string",
                },
                doNotDisturbEndTime: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/dormancy/{id}": {
      put: {
        tags: ["회원"],
        summary: "휴면 설정",
        description: "<p><b>path:: /api/account/dormancy/{id}</b></p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "회원 고유 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/accountDevice": {
      post: {
        tags: ["회원 기기 정보"],
        summary: "회원 기기 정보 등록",
        description:
          "<p><b>path:: /api/accountDevice</b></p>" +
          "<p><b>id</b>: 사용자 고유관리번호</p>" +
          "<p><b>deviceToken</b>: 디바이스 토큰</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                userId: {
                  type: "integer",
                },
                deviceToken: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                socialKey: {
                  type: "string",
                  description: "인증키",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    socialKey: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/account/kakaoLogin": {
      post: {
        tags: ["소셜로그인"],
        summary: "카카오톡 로그인",
        description: "path:: /api/account/kakaoLogin",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                accessToken: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                socialKey: {
                  type: "string",
                  description: "인증키",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    socialKey: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/account/facebookLogin": {
      post: {
        tags: ["소셜로그인"],
        summary: "페이스북 로그인",
        description: "path:: /api/account/facebookLogin",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                accessToken: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                socialKey: {
                  type: "string",
                  description: "인증키",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    socialKey: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/account/appleLogin": {
      post: {
        tags: ["소셜로그인"],
        summary: "애플 로그인",
        description: "path:: /api/account/appleLogin",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                identityToken: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                socialKey: {
                  type: "string",
                  description: "인증키",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    socialKey: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/account/naverLogin": {
      post: {
        tags: ["소셜로그인"],
        summary: "네이버 로그인",
        description: "path:: /api/account/naverLogin",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                accessToken: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                socialKey: {
                  type: "string",
                  description: "인증키",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    socialKey: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/account/googleLogin": {
      post: {
        tags: ["소셜로그인"],
        summary: "구글 로그인",
        description: "path:: /api/account/googleLogin",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                accessToken: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                socialKey: {
                  type: "string",
                  description: "인증키",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    socialKey: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/subscribe": {
      post: {
        tags: ["팬"],
        summary: "팬 등록",
        description: "path:: /api/subscribe",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                rankerId: {
                  type: "integer",
                },
                subscriberId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/subscribe/cancel": {
      post: {
        tags: ["팬"],
        summary: "팬 등록 취소",
        description:
          "path:: /api/subscribe/cancel \n" +
          "<p>rankerId : 랭커 ID</p>\n" +
          "<p>subscriberId : 로그인한 사용자 ID</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                rankerId: {
                  type: "integer",
                },
                subscriberId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/subscribe/findAll": {
      get: {
        tags: ["팬"],
        summary: "팬 목록 조회",
        description:
          "<p>path:: /api/subscribe/findAll</p>" +
          "<p><b>rankerId</b> : 팬 목록(나를 구독한 목록)</p>" +
          "<p><b>subsribeId</b> : 응원하는팬 목록(내가 구독한 목록)</p>" +
          "<p><b>keyword</b> : 검색어</p>",
        parameters: [
          {
            name: "rankerId",
            in: "query",
            required: false,
            description: "랭커 아이디",
            schema: {
              type: "String",
            },
          },
          {
            name: "subsribeId",
            in: "query",
            required: false,
            description: "구독자 고유번호",
            schema: {
              type: "String",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "사용자 번호",
                },
                userId: {
                  type: "string",
                  description: "아이디",
                },
                name: {
                  type: "string",
                  description: "이름",
                },
                restStatus: {
                  type: "boolean",
                  description: "휴식상태",
                },
                imageId: {
                  type: "integer",
                  description: "사용자 이미지 id",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                    },
                    userId: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    updatedAt: {
                      type: "string",
                    },
                    loginOn: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/letter": {
      post: {
        tags: ["레터"],
        summary: "레터 등록",
        description:
          "<p><b>path:: /api/letter\n senderId, recipientId : 사용자 고유관리번호</b></p>" +
          "<p><b>status</b> : 공개설정(true: 전체공개, false : 받는사람만)</p>" +
          "<p><b>saveState</b> : 저장상태(true: 저장완료, false: 임시저장)</p>" +
          "<p><b>type</b> : LETTER(레터), REPLY(답장)</p>" +
          "<p><b>letterId</b> : 답변할 레터 ID 담아서 보냄(레터 답변할 때만 담아서 보내주면 됨)</p>" +
          "<p><b>hashtag</b> : 해시태그 (최대 10개 등록)</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                senderId: {
                  type: "integer",
                },
                recipientId: {
                  type: "integer",
                },
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                paymentAmount: {
                  type: "integer",
                },
                fileIds: {
                  type: "array",
                  example: [1, 2, 3],
                },
                hashtag: {
                  type: "array",
                  example: ["레터1", "레터2"],
                },
                status: {
                  type: "boolean",
                },
                saveState: {
                  type: "boolean",
                },
                type: {
                  type: "string",
                },
                letterId: {
                  description: "답변할 레터 id",
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/findAll": {
      get: {
        tags: ["레터"],
        summary: "레터 목록 조회",
        description:
          "<h3>path:: /api/letter/findAll  - 치어스-사용자-화면설계서 10p</h3>\n" +
          "getter : 사용자 고유 ID\n",
        parameters: [
          {
            name: "getter",
            in: "query",
            required: false,
            description: "받은레터(사용자 id)",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "번호",
                },
                title: {
                  type: "string",
                  description: "레터제목",
                },
                content: {
                  type: "string",
                  description: "레터내용",
                },
                senderId: {
                  type: "integer",
                  description: "보낸사람 id",
                },
                senderImageId: {
                  type: "integer",
                  description: "보낸사람 이미지 id",
                },
                senderUserId: {
                  type: "string",
                  description: "보낸사람 userId",
                },
                recipientId: {
                  type: "integer",
                  description: "받는사람 id",
                },
                recipientImageId: {
                  type: "integer",
                  description: "받는사람 이미지 id",
                },
                recipientUserId: {
                  type: "string",
                  description: "받는사람 userId",
                },
                createdAt: {
                  type: "localdatetime",
                  description: "레터 등록날짜",
                },
                replyYn: {
                  type: "boolean",
                  description: "답장여부",
                },
                status: {
                  type: "boolean",
                  description: "공개설정",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                    },
                    userId: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    updatedAt: {
                      type: "string",
                    },
                    loginOn: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/letter/hashtag": {
      get: {
        tags: ["레터"],
        summary: "레터 목록 조회 (해시태그로)",
        description: "<p><b>path:: /api/letter/hashtag</b></p>",
        parameters: [
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "해시태그 이름",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/details/{id}": {
      get: {
        tags: ["레터"],
        summary: "레터 상세조회",
        description: "path:: /api/letter/details/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: false,
            description: "레터 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "userID",
            in: "query",
            required: false,
            description: "query",
            schema: {
              properties: {
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/hideLetter/{id}": {
      put: {
        tags: ["레터"],
        summary: "레터 숨김",
        description: "path:: /api/letter/hideLetter/{id",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: false,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/createDeclarationLetter": {
      post: {
        tags: ["레터"],
        summary: "레터 신고",
        description: "path:: /api/letter/createDeclarationLetter",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                letterId: {
                  type: "integer",
                },
                content: {
                  type: "string",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/deleteLetterStatus": {
      delete: {
        tags: ["레터"],
        summary: "레터 삭제",
        description:
          "path:: /api/letter/deleteLetterStatus\n" +
          "<h3>REQUEST</h3>\n" +
          "<p>id: 레터 고유 ID</p>" +
          "<p>userId: 사용자 ID</p>",
        // "<p>letterType : 보낸 레터 (SEND), 받은레터 (RECEIVE)</p>\n" +
        // "<p>1. 내가 다른 사람한테 보낸 레터 삭제 시 받은 사람 피드에 미노출 : sent_delete_yn</p>\n" +
        // "<p>2. 내가 다른 사람한테 받은거를 삭제하면 보낸 사람한테만 보임 : received_delete_yn</p>\n",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                id: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/like": {
      post: {
        tags: ["레터"],
        summary: "레터 좋아요",
        description: "path:: /api/letter/like",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                letterId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/cancelLike": {
      post: {
        tags: ["레터"],
        summary: "레터 좋아요 취소",
        description: "path:: /api/letter/cancelLike",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                letterId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/letterShare": {
      post: {
        tags: ["레터"],
        summary: "레터 공유수 증가",
        description: "path:: /api/letter/letterShare",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                letterId: {
                  type: "integer",
                },
                // userId: {
                //   type: "integer",
                // },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/create/comments": {
      post: {
        tags: ["레터"],
        summary: "레터 댓글 등록",
        description:
          "path:: /api/letter/create/comments\n" +
          "<p>saveState : 저장상태(true: 저장완료, false: 임시저장)</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                letterId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                content: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/comments/{id}": {
      delete: {
        tags: ["레터"],
        summary: "레터 댓글 삭제",
        description: "path:: /api/letter/comments/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/createDeclarationComment": {
      post: {
        tags: ["레터"],
        summary: "레터 댓글 신고",
        description: "path:: /api/letter/createDeclarationComment",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                commentId: {
                  type: "integer",
                },
                content: {
                  type: "string",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    // "/api/letter/comments/{id}": {
    //   put: {
    //     tags: ["레터"],
    //     summary: "레터 댓글 수정",
    //     description: "path:: /api/letter/comments/{id}",
    //     produces: "applicaion/json",
    //     parameters: [
    //       {
    //         name: "id",
    //         in: "path",
    //         required: true,
    //         description: "ID",
    //         schema: {
    //           type: "integer",
    //         },
    //       },
    //       {
    //         name: "body",
    //         in: "body",
    //         required: true,
    //         description: "body",
    //         schema: {
    //           properties: {
    //             content: {
    //               type: "string",
    //             },
    //           },
    //         },
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: "OK",
    //         message: "OK",
    //       },
    //     },
    //   },
    // },
    "/api/letter/comments": {
      get: {
        tags: ["레터"],
        summary: "댓글 목록 조회",
        description: "path:: /api/letter/comments",
        parameters: [
          {
            name: "letterId",
            in: "query",
            required: true,
            description: "레터 관리번호",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: true,
            description: "몇개를 가져올 것인지",
            schema: {
              type: "integer",
            },
          },
          {
            name: "offset",
            in: "query",
            required: true,
            description: "몇개를 건너뛸 것인지",
            schema: {
              type: "integer",
            },
          },
          {
            name: "userId",
            in: "query",
            required: true,
            description: "로그인한 사용자 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "번호",
                },
                letterId: {
                  type: "string",
                  description: "레터 고유번호",
                },
                content: {
                  type: "string",
                  description: "댓글 내용",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "번호",
                    },
                    letterId: {
                      type: "string",
                      description: "레터 고유번호",
                    },
                    content: {
                      type: "string",
                      description: "댓글 내용",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/letter/replyComments": {
      post: {
        tags: ["레터"],
        summary: "레터 대댓글 등록",
        description: "path:: /api/letter/replyComments",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                letterId: {
                  type: "integer",
                },
                commentId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                content: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/replyComments/{id}": {
      put: {
        tags: ["레터"],
        summary: "레터 대댓글 수정",
        description: "path:: /api/letter/replyComments/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                content: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/replyComments/delete/{id}": {
      delete: {
        tags: ["레터"],
        summary: "레터 대댓글 삭제",
        description: "path:: /api/letter/delete/replyComments/delete/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/letter/findUserDeailLetterAll": {
      get: {
        tags: ["레터"],
        summary: "회원상세 받은레터, 보낸레터, 좋아요한 레터 목록 조회",
        description:
          "path:: /api/letter/findUserDeailLetterAll \n" +
          "<h3>REQUEST</h3>\n" +
          "<p>회원 id보내면 그에 맞게 조회되도록 되어 있으니 로그인한 유저 상세, 팬 유저 상세 모두 사용 가능한 API</p>",
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            description: "사용자 id",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "번호",
                },
                userId: {
                  type: "string",
                  description: "아이디",
                },
                password: {
                  type: "string",
                  description: "비밀번호",
                },
                email: {
                  type: "string",
                  description: "이메일",
                },
                createdAt: {
                  type: "string",
                  description: "작성 날짜",
                },
                updatedAt: {
                  type: "string",
                  description: "수정 날짜",
                },
                loginOn: {
                  type: "string",
                  description: "마지막 접속 날짜",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                    },
                    userId: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    updatedAt: {
                      type: "string",
                    },
                    loginOn: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/reply": {
      post: {
        tags: ["레터"],
        summary: "레터 답글 등록",
        description: "path:: /api/reply\n",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                senderId: {
                  type: "integer",
                },
                recipientId: {
                  type: "integer",
                },
                content: {
                  type: "string",
                },
                letterId: {
                  description: "답변할 레터 id",
                  type: "integer",
                },
                saveState: {
                  type: "boolean",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/comment/like": {
      post: {
        tags: ["레터"],
        summary: "댓글 좋아요",
        description: "path:: /api/comment/like",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                commentId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/comment/cancelLike": {
      post: {
        tags: ["레터"],
        summary: "댓글 좋아요 취소",
        description: "path:: /api/comment/cancelLike",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                commentId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/hashtag": {
      get: {
        tags: ["해시태그"],
        summary: "해시태그 목록 조회",
        description: "path:: /api/hashtag",
        produces: "applicaion/json",
        parameters: [
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/single/upload": {
      post: {
        tags: ["파일"],
        summary: "파일 업로드",
        description: "path:: /single/upload",
        consumes: "multipart/form-data",
        parameters: [
          {
            in: "formData",
            name: "file",
            type: "file",
            description: "파일 업로드",
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/file/thumbnail": {
      post: {
        tags: ["파일"],
        summary: "썸네일 등록",
        description: "path:: api/file/thumbnail",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                path: {
                  type: "string",
                  default: "../uploads/1625139247344.mp4",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/download": {
      get: {
        tags: ["파일"],
        summary: "파일 다운로드",
        description: "path:: /download",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            description: "id",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/mail": {
      post: {
        tags: ["이메일"],
        summary: "이메일 인증",
        description:
          "<p><b>path::</b> /api/account<p>" +
          "<p><b>mail</b> : 받는사람 email 주소</p>" +
          "<p><b>type</b> : 인증유형(password(비밀번호 변경), id(아이디찾기), join(회원가입))</p>" +
          "<p><b>userId</b> : 사용자 아이디 (비밀번호, 회원가입)</p>" +
          "<p><b>socialType</b> : 소셜타입 (회원가입)</p>" +
          "<p><b>createdAt</b> : 가입날짜 (회원가입)</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                mail: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
                socialType: {
                  type: "string",
                },
                createdAt: {
                  type: "date",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/checkCode": {
      get: {
        tags: ["이메일"],
        summary: "이메일 인증 요청",
        description: "path:: /api/account/checkCode",
        produces: "applicaion/json",
        parameters: [
          {
            name: "code",
            in: "query",
            required: false,
            description: "인증번호",
            schema: {
              type: "string",
            },
          },
          {
            name: "userId",
            in: "query",
            required: false,
            description: "사용자 고유 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/bankAccount": {
      post: {
        tags: ["계좌"],
        summary: "계좌 등록",
        description:
          "<p><b>path::</b> /api/bankAccount<p>" +
          "<p><b>mail</b> : 받는사람 email 주소</p>" +
          "<p><b>type</b> : 인증유형(password(비밀번호 변경), id(아이디찾기))</p>" +
          "<p><b>name</b> : 받는사람 이름</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                phone: {
                  type: "string",
                },
                accountHolder: {
                  type: "string",
                },
                bankName: {
                  type: "string",
                },
                accountNumber: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/openBanking/token": {
      get: {
        tags: ["인앱"],
        summary: "인앱 - 사용자인증",
        description: "path:: /api/openBanking/token",
        produces: "applicaion/json",
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/openBanking/accountRealNameInquiry": {
      post: {
        tags: ["인앱"],
        summary: "인앱 - 계좌실명조회",
        description: "path:: /api/accountRealNameInquiry",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                token: {
                  type: "string",
                },
                bankCode: {
                  type: "string",
                },
                accountNum: {
                  type: "string",
                },
                accountHolderInfo: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/pushSend": {
      get: {
        tags: ["푸시"],
        summary: "푸시 전송",
        description: "path:: /pushSend",
        produces: "applicaion/json",
        parameters: [
          {
            name: "title",
            in: "query",
            required: false,
            description: "제목",
            schema: {
              type: "string",
            },
          },
          {
            name: "message",
            in: "query",
            required: false,
            description: "내용",
            schema: {
              type: "string",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description:
              "푸시알람 타입(신규레터(newLetter), 답장수신(receiveReply), 댓글 알림(commentNotifications), 좋아요 알림(likeNotifications))",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/push": {
      get: {
        tags: ["푸시"],
        summary: "푸시 목록조회(사용자별)",
        description: "path:: /api/push",
        produces: "applicaion/json",
        parameters: [
          {
            name: "userId",
            in: "query",
            required: false,
            description: "사용자 고유 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/push/{userId}": {
      put: {
        tags: ["푸시"],
        summary: "푸시 읽음여부 상태 수정",
        description: "path:: /api/push/{userId}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            description: "사용자 고유 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                pushId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/payment": {
      post: {
        tags: ["결제"],
        summary: "인앱결제 내역 저장",
        description: "<p><b>path:: /api/payment</b></p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                iapJson: {
                  type: "string",
                },
                paymentAmount: {
                  type: "string",
                },
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/batch/settlement": {
      get: {
        tags: ["배치"],
        summary: "월정산 배치",
        description: "<p><b>path:: /api/batch/settlement</b></p>",
        produces: "applicaion/json",
        // parameters: [
        //   {
        //     name: "body",
        //     in: "body",
        //     required: true,
        //     description: "body",
        //     schema: {
        //       properties: {
        //         iapJson: {
        //           type: "string",
        //         },
        //         paymentAmount: {
        //           type: "string",
        //         },
        //         userId: {
        //           type: "integer",
        //         },
        //       },
        //     },
        //   },
        // ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/admin": {
      get: {
        tags: ["1.관리자 - 회원관리"],
        summary: "회원 목록 조회",
        description:
          "<p><b>path:: /api/account/admin</b></p>" +
          "<p><b>sDate, eDate</b>: LocalDateTiem 형식으로 2021-07-01 00:00:00, 2021-07-01 23:59:59</p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["createdAt", "loginOn"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/admin/{id}": {
      get: {
        tags: ["1.관리자 - 회원관리"],
        summary: "회원 상세 조회",
        description: "<p><b>path:: /api/account/admin/{id}</b></p>",
        parameters: [
          {
            name: "id",
            in: "path",
            required: false,
            description: "사용자 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/secession/admin": {
      get: {
        tags: ["1.관리자 - 회원관리"],
        summary: "강제탈퇴회원 목록 조회",
        description:
          "<p><b>path:: /api/account/secession/admin</b></p>" +
          "<p><b>sDate, eDate</b>: LocalDateTiem 형식으로 2021-07-01 00:00:00, 2021-07-01 23:59:59</p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["createdAt", "loginOn"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/secession/admin/{id}": {
      get: {
        tags: ["1.관리자 - 회원관리"],
        summary: "강제탈퇴회원 상세 조회",
        description: "<p><b>path:: /api/account/secession/admin/{id}</b></p>",
        parameters: [
          {
            name: "id",
            in: "path",
            required: false,
            description: "사용자 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/account/compulsionSecession/{id}": {
      delete: {
        tags: ["1.관리자 - 회원관리"],
        summary: "강제회원 탈퇴",
        description:
          "<p><b>path:: /api/account/compulsionSecession/{id}</b></p>" +
          "<p><b>id</b>: 회원 고유 ID</p>" +
          "<p><b>reasonForWithdrawal</b>: 탈퇴 사유</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                reasonForWithdrawal: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/authentication": {
      post: {
        tags: ["2.관리자 - 인증요청관리"],
        summary: "인증요청 등록",
        description: "path:: /api/authentication",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                userId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                requestName: {
                  type: "string",
                },
                activityName: {
                  type: "string",
                },
                activityField: {
                  type: "string",
                },
                imageId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/authentication/findAll": {
      get: {
        tags: ["2.관리자 - 인증요청관리"],
        summary: "인증요청목록 조회",
        description: "path:: /api/authentication/findAll",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["requestDate", "processingDate"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "status",
            in: "query",
            required: false,
            description: "처리상태",
            schema: {
              type: "String",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/authentication/details/{id}": {
      get: {
        tags: ["2.관리자 - 인증요청관리"],
        summary: "인증요청 상세조회",
        description: "path:: /api/authentication/details/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/authentication/history": {
      get: {
        tags: ["2.관리자 - 인증요청관리"],
        summary: "인증요청내역목록 조회",
        description: "path:: /api/authentication/history",
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            description: "인증요청내역 고유 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/authentication/acknowledgment/{id}": {
      put: {
        tags: ["2.관리자 - 인증요청관리"],
        summary: "인증요청 승인",
        description: "path:: /api/authentication/acknowledgment/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                userId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/authentication/reject/{id}": {
      put: {
        tags: ["2.관리자 - 인증요청관리"],
        summary: "인증요청 반려",
        description: "path:: /api/authentication/reject/{id}",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              // type: "formData",
              properties: {
                userId: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/declaration/List": {
      get: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고관리 - 신고 관리목록 조회(21p)",
        description:
          "<p><b>path:: /api/declaration/List</b></p>" +
          "<p><b>type: 신고 대상(LETTER(레터), REPLY(답장), COMMENT(댓글)) </b></p>" +
          "<p><b>status: 처리상태(대기(WAIT), 삭제(REMOVE), 반려(REJECT)) </b></p>" +
          "<p><b>sDate, eDate</b>: LocalDateTiem 형식으로 2021-07-01 00:00:00, 2021-07-01 23:59:59</p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["createdAt", "processingAt"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "신고대상",
            schema: {
              type: "String",
            },
          },
          {
            name: "status",
            in: "query",
            required: false,
            description: "처리상태",
            schema: {
              type: "String",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/declaration/HistoryList": {
      get: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고관리 - 신고 내역 조회(22p)",
        description:
          "<p><b>path:: /api/declaration/HistoryList</b></p>" +
          "<p><b>type: 신고 대상(LETTER(레터), REPLY(답장), COMMENT(댓글)) </b></p>",
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            description: "신고대상 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "신고대상 타입",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/declaration/ProcessingHistoryList": {
      get: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고관리 - 처리 내역 조회(22p)",
        description:
          "<p><b>path:: /api/declaration/ProcessingHistoryList</b></p>" +
          "<p><b>type: 신고 대상(LETTER(레터), REPLY(답장), COMMENT(댓글)) </b></p>",
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            description: "신고대상 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "신고대상 타입",
            schema: {
              type: "string",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/declaration/reject/{id}": {
      put: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고요청 반려",
        description:
          "<p><b>path:: /api/declaration/reject/{id}</b></p>" +
          "<p><b>userId</b> : 사용자 고유 ID</p>" +
          "<p><b>content</b> : 반려이유</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                userId: {
                  type: "integer",
                },
                content: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/declaration/remove/{id}": {
      put: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고요청 삭제",
        description:
          "<p><b>path:: /api/declaration/remove/{id}</b></p>" +
          "<p><b>userId</b> : 사용자 고유 ID</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                userId: {
                  type: "integer",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/warning": {
      post: {
        tags: ["3.관리자 - 신고관리"],
        summary: "경고레터 전송",
        description:
          "<p><b>path:: /api/declaration/remove/{id}</b></p>" +
          "<p><b>title</b> : 제목</p>" +
          "<p><b>content</b> : 내용</p>" +
          "<p><b>senderId</b> : 보내는 사람 고유 Id</p>" +
          "<p><b>recipientId</b> : 받는 사람 userId(기확서 상 고유 번호를 줄 수 없을 것 같아 ID로 전달받도록 설계)</p>",
        produces: "applicaion/json",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                senderId: {
                  type: "integer",
                },
                recipientId: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/declaration/accountList": {
      get: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고관리 - 사용자별 신고 내역 조회",
        description: "<p><b>path:: /api/declaration/accountList</b></p>",
        parameters: [
          {
            name: "userId",
            in: "query",
            required: false,
            description: "신고대상 ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/warning/list": {
      get: {
        tags: ["3.관리자 - 신고관리"],
        summary: "신고관리 - 사용자별 경고 내역 조회",
        description: "<p><b>path:: /api/warning/list</b></p>",
        parameters: [
          {
            name: "userId",
            in: "query",
            required: false,
            description: "신고대상 ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/settlement": {
      get: {
        tags: ["4.관리자 - 정산관리"],
        summary: "정산관리 - 관리자 정산내역조회(월별로)",
        description: "<p><b>path:: /api/settlement</b></p>",
        parameters: [
          {
            name: "settlementMonth",
            in: "query",
            required: false,
            description: "기간검색",
            schema: {
              type: "string",
            },
          },
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["id", "name"],
            schema: {
              type: "string",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "페이지 수",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "한 페이지에 보여질 수",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/settlement/status": {
      post: {
        tags: ["4.관리자 - 정산관리"],
        summary: "정산관리 - 관리자 정산내역 상태변경",
        description: "<p><b>path:: /api/settlement/status</b></p>",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            description: "body",
            schema: {
              properties: {
                settlementId: {
                  type: "array",
                  example: [1, 2, 3],
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/excel/accountAdmin": {
      get: {
        tags: ["9.엑셀"],
        summary: "엑셀다운로드 - 관리자 - 회원관리 목록",
        description: "<p><b>path:: /api/excel/accountAdmin</b></p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["createdAt", "loginOn"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/excel/accountSecessionAdmin": {
      get: {
        tags: ["9.엑셀"],
        summary: "엑셀다운로드 - 관리자 - 강제탈퇴회원 목록",
        description: "<p><b>path:: /api/excel/accountSecessionAdmin</b></p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["createdAt", "loginOn"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/excel/authenticationRequest": {
      get: {
        tags: ["9.엑셀"],
        summary: "엑셀다운로드 - 관리자 - 인증요청목록",
        description: "<p><b>path:: /api/excel/authenticationRequest</b></p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["requestDate", "processingDate"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "status",
            in: "query",
            required: false,
            description: "처리상태",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
    "/api/excel/declaration": {
      get: {
        tags: ["9.엑셀"],
        summary: "엑셀다운로드 - 관리자 - 신고관리목록",
        description: "<p><b>path:: /api/excel/declaration</b></p>",
        parameters: [
          {
            name: "searchType",
            in: "query",
            required: false,
            description: "검색타입",
            enum: ["createdAt", "processingAt"],
            schema: {
              type: "String",
            },
          },
          {
            name: "sDate",
            in: "query",
            required: false,
            description: "시작날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "eDate",
            in: "query",
            required: false,
            description: "종료날짜",
            schema: {
              type: "date",
            },
          },
          {
            name: "keyword",
            in: "query",
            required: false,
            description: "검색어",
            schema: {
              type: "String",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "신고대상",
            schema: {
              type: "String",
            },
          },
          {
            name: "status",
            in: "query",
            required: false,
            description: "처리상태",
            schema: {
              type: "String",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            message: "OK",
          },
        },
      },
    },
  },
};

export default options;

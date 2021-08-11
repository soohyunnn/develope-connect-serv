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
  },
};

export default options;

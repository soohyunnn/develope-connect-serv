module.exports = {
  apps: [
    {
      name: "chrs-serv-dev",
      script: "node ./build/app.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};

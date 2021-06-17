const config = {
  server: "sysflex.ddns.net",
  port: 10085,
  user: "sa",
  password: "Agenda2008",
  database: "Padron",
  connectionTimeout: 3000,
  driver: "tedious",
  stream: false,
  options: {
    encrypt: false,
    enableArithAbort: false,
  },
};


module.exports = config;
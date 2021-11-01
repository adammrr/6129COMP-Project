module.exports = {
    HOST: "6129comp.mysql.database.azure.com",
    USER: "ServerAdmin@6129comp",
    PASSWORD: "6129COMP-S3rV3rL0g1N!",
    DB: "coursework",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
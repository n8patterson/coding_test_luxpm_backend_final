const Development = {
    USER: "master",
    PASSWORD: "",
};

const Production = {
    USER: "admin",
    PASSWORD: "",
}

module.exports = {
    ...(process.env.ENV === "prod" ? Production : Development),
    HOST: "127.0.0.1",
    DB: "patterson",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}
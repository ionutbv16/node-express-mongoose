const mongoose = require("mongoose");
const _ = require("lodash");
const logger = require("./config/logger")(module);
const { config } = require("./config/config");
const app = require("./config/express");

// GOOD TASTE CODE HANDLING
const dbUrl = _.get(config, "db.host", "");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  const { message } = err;
  return logger.error("Unable to connect to MongoDB:", message);
});

const { env, port } = config;
app.listen(port, () => {
  logger.info(`Running on ${env} mode`);
  logger.info(`Todo server listening on port ${port}.`);
});

module.exports = {
  app,
};

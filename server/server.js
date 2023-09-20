const express = require("express");
const winston = require("winston");
const app = express();
require("dotenv").config();

app.use(express.json());

// Winston L Conf
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'stjosephservice' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

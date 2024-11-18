import pino from "pino";
import dayjs from "dayjs";

const loggerInstance = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
      ignore: "pid,hostname",
    },
  },
  base: {
    pid: false,
  },
  // level: process.env.NODE_ENV === "production" ? "info" : "debug",
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss")}"`,
});

export { loggerInstance as logger };

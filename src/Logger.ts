import winston from "winston";
import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

interface Options {
    console: boolean,
    dirname: string,
    filename: string
}

export class Logger {
    private winston: winston.Logger;

    constructor(options: Options) {
        const format = printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        });

        const transport = new (winston.transports.DailyRotateFile)({
            filename: options.filename,
            dirname: options.dirname,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
        });

        const logger = this.winston = winston.createLogger({
            level: "info",
            format: combine(
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format
            ),
            transports: [transport],
        });

        if (options.console) {
            logger.add(new winston.transports.Console({
                format: combine(
                    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                    format
                ),
            }));
        }
    }

    info(messgae: string) {
        this.winston.info(messgae);
    }
}

const { createLogger, format, transports, config } = require('winston');

const playersLogger = createLogger({

    transports:
    new transports.File({
    filename: '../logs/players.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),

 });
 const gameSessionsLogger = createLogger({
    transports:
    new transports.File({
    filename: '../logs/game_sessions.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
 });
 
 module.exports = {
     playersLogger: playersLogger,
     gameSessionsLogger: gameSessionsLogger
 };
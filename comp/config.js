require('dotenv').config();
const env = process.env;

module.exports = {
    nodemon: env.NODEMON || false,
    port: env.PORT || 8080,
    host: env.HOST,
    siteUrl: `${env.HOST}:${env.PORT}`
};
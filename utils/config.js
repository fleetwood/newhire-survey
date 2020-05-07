require('dotenv').config();
const env = process.env;
const path = require('path');
const node_path = env.NODE_PATH ? env.NODE_PATH : '.'

module.exports = {
    nodemon: env.NODEMON || false,
    port: env.PORT || 8080,
    host: env.HOST,
    siteUrl: `${env.HOST}:${env.PORT}`,
    node_path,
    root: (dir) => path.resolve(node_path, dir)
};
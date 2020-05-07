'use strict';
const config = require('./utils/config');
const app = require('./express/server');
app.listen(config.port, () => console.log(`Site: http://${config.siteUrl}`));

var router = require('koa-router')();

var config = require('./modules/config');

router.get('/configs', config.getConfigs);

module.exports = router;

var router = require('koa-router')();

var config = require('./modules/config');

router.get('/configs', config.getConfigs);
router.post('/configs', config.saveConfigs);

module.exports = router;

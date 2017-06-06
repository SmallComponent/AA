var router = require('koa-router')();

var config = require('./modules/config');

router.get('/configs', config.getConfigs);
router.post('/configs', config.saveConfigs);

var user = require('./modules/user');

router.post('/users/register', user.register);
router.post('/users/login', user.login);

module.exports = router;

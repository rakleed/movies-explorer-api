const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', require('./404'));

module.exports = router;

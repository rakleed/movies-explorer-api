const router = require('express').Router();
const { login } = require('../controllers/users');
const { validateLogin } = require('../middlewares/validation');

router.post('/', validateLogin, login);

module.exports = router;

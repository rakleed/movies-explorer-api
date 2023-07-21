const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateCreateUser } = require('../middlewares/validation');

router.post('/', validateCreateUser, createUser);

module.exports = router;

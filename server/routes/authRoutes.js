const router = require('express').Router();
const authController = require('../controllers/authController');
const {register, login, validate} = require('../middleware/validation');

router.post('/register', validate(register), authController.register);
router.post('/login', validate(login), authController.login);

module.exports = router;
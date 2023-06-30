const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/forgotPassword', authController.forgotPassword);
router.get('/reset-password?token/:token', authController.resetPassword);
router.get('/refresh', authController.refresh);

module.exports = router;

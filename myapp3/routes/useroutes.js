const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/usercontroller');


router.post('/register',usercontroller.register);
router.post('/login',usercontroller.login);
router.post('/profile',usercontroller.loginrequired,usercontroller.profile);






module.exports = router;
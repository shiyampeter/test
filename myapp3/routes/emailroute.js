const express = require('express');
const router = express.Router();
const emailcontroller = require('../controllers/email');


router.post('/mail',emailcontroller.mail);

router.post('/mailout',emailcontroller.mailout);






module.exports = router;
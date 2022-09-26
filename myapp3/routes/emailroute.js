const express = require('express');
const router = express.Router();
const emailcontroller = require('../controllers/email');


router.post('/mail',emailcontroller.mail);







module.exports = router;
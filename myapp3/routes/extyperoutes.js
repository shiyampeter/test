const express = require('express');
const router = express.Router();

const examtypecontroller = require('../controllers/examtypecontroller');

router.get('/viewall',examtypecontroller.viewall);
router.post('/store',examtypecontroller.store);
router.patch('/update/:id',examtypecontroller.update);
router.delete('/erase/:id',examtypecontroller.erase);
router.get('/viewone/:id',examtypecontroller.viewone);







module.exports = router;
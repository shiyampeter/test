const express = require('express');
const router = express.Router();

const examcontroller = require('../controllers/examcontroller');

router.get('/viewall',examcontroller.viewall);
router.post('/store',examcontroller.store);
router.patch('/update/:id',examcontroller.update);
router.delete('/erase/:id',examcontroller.erase);
router.get('/viewone/:id',examcontroller.viewone);
router.get('/viewdetail/:stid/:exid',examcontroller.viewdetail);







module.exports = router;
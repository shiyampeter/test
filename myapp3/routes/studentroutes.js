const express = require('express');
const router = express.Router();

const studentcontroller = require('../controllers/studentcontroller');


router.post('/store',studentcontroller.store);
router.patch('/update/:id',studentcontroller.update);
router.delete('/erase/:id',studentcontroller.erase);
router.get('/viewone/:id',studentcontroller.viewone);
router.get('/viewbypage',studentcontroller.viewbypage);
router.get('/viewpage',studentcontroller.viewpage);
router.get('/viewbyname/:name?/:rno?',studentcontroller.viewbyname);
router.get('/viewbyoption',studentcontroller.viewbyoption);







module.exports = router;
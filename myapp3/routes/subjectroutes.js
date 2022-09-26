const express = require('express');
const router = express.Router();

const subjectcontroller = require('../controllers/subjectcontroller');

router.get('/viewall',subjectcontroller.viewall);
router.post('/store',subjectcontroller.store);
router.patch('/update/:id',subjectcontroller.update);
router.delete('/erase/:id',subjectcontroller.erase);
router.get('/viewaggregate',subjectcontroller.viewaggregate);
router.get('/viewone/:id',subjectcontroller.viewone);







module.exports = router;
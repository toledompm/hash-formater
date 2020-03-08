const express = require('express');
const hashGenController = require('../controllers/HashGenController');
console.log(hashGenController);
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index',{title:'Home'});
});

router.post('/generate', hashGenController);

module.exports = router;
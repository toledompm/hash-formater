const express = require('express');
const hashGenController = require('../controllers/HashGenController');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index',{title:'Home'});
});

router.post('/generate', [hashGenController.setParams,
                          hashGenController.createHashGen,
                          hashGenController.formatOptions,
                          hashGenController.getHashes]
);

module.exports = router;
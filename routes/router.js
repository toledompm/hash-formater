const express = require('express');
const hashGenController = require('../controllers/hashGenController.js');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index',{title:'Home'});
});

router.post('/generate', (req,res) => {
    const hgController = new hashGenController(req.body);
    const hashReadStream = hgController.getHashes();
    res.set('Content-disposition','attachment; filename=hashes.txt');
    res.set('Content-Type','text/plain');
    
    hashReadStream.pipe(res);
});

module.exports = router;
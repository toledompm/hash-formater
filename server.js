const express = require('express');
const path = require('path');
const router = require('./routes/router.js');


const app = express();
const port = '3000';

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));

app.use('/',router);

app.listen(port, () =>{
    console.log('listening on 3000');
});
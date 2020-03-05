const hg = require('../models/HashGen');
const stream = require('stream');

module.exports = {
    setParams: (req,res,next) => {
        const params = req.body;
        
        req.keys = params.keys;
        req.values = params.values;
        req.options = {
            quoteFirst:params.quoteFirst,
            quoteSecond:params.quoteSecond,
            before:params.before,
            between:params.between,
            after:params.after
        }
        next();
    },

    createHashGen: (req,res,next) => {
        req.keyArray = req.keys.split(',');
        req.valArray = req.values.split(',');

        req.hashGen = new hg({
            keys:req.keyArray,
            values:req.valArray
        });
        next();
    },

    formatOptions: (req,res,next) => {
        for (const option in req.options){
            if(req.options[option] === ''){
                delete req.options[option];
            }
        }
        next();
    },

    getHashes: (req,res) => {
        const hashString = req.hashGen.formatHashes(req.options).join(', ');
        const hashBuffer = Buffer.from(
            hashString,
            'utf-8'
        );

        const hashStream = new stream.PassThrough();
        hashStream.end(hashBuffer);
        
        res.set('Content-disposition','attachment; filename=hashes.txt');
        res.set('Content-Type','text/plain');
        hashStream.pipe(res);
    }

}

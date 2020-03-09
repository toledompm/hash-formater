const hg = require('../models/HashGen');
const stream = require('stream');

class Controller{
    static setParams(req,res,next){
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
    }

    static createHashGen(req,res,next){
        req.keyArray = req.keys.split(" ");
        req.valArray = req.values.split(" ");

        req.hashGen = new hg({
            keys:req.keyArray,
            values:req.valArray
        });
        next();
    }

    static formatOptions(req,res,next){
        req.options = Object.keys(req.options)
            .filter(key => req.options[key] === "");
        next();
    }

    static getHashes(req,res){
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

module.exports = [
    Controller.setParams,
    Controller.createHashGen,
    Controller.formatOptions,
    Controller.getHashes
];

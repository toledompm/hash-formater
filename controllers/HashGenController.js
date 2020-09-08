const hg = require('../models/HashGen');
const formidable = require('formidable');
const XLSX = require('xlsx');
const stream = require('stream');
const fs = require ('fs')

class Controller{
    static setParams(req,res,next){
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            req.keys = fields.keys;
            req.values = fields.values;
            req.file = files[Object.keys(files)[0]];
            req.options = {
                before: fields.before,
                between: fields.between,
                after: fields.after,
                quoteFirst: fields.quoteFirst,
                quoteSecond: fields.quoteSecond
            };
            next();
        });
    }

    static createHashGen(req,res,next){
        if(req.keys != "" && req.values != ""){
            req.keyArray = req.keys.split(",");
            req.valArray = req.values.split(",");
        }
        else{
            req.keyArray = [];
            req.valArray = [];
            const workbook = XLSX.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            xlData.forEach(row => {
                req.keyArray.push(row.keys);
                req.valArray.push(row.values);
            });
        }        

        req.hashGen = new hg({
            keys:req.keyArray,
            values:req.valArray
        });
        next();
    }

    static formatOptions(req,res,next){
        Object.entries(req.options).forEach(option => {
            if(option[1] === '') {
                delete req.options[option[0]];
            }
        });
        console.log(req.options);
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

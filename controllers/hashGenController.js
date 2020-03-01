const hg = require('../models/hashGen.js');
const stream = require('stream');

class hashGenController{
    constructor(params){
        this.keys = params.keys;
        this.values = params.values;
        this.options = {
            quoteFirst:params.quoteFirst,
            quoteLast:params.quoteLast,
            before:params.before,
            between:params.between,
            after:params.after
        }

        this.hashGen = new hg(this.__createHashGenParameters());
        this.__formatOptions();
    }

    __createHashGenParameters(){
        this.keysList = this.keys.split(',');
        this.valsList = this.values.split(',');
        return {
            keys:this.keysList,
            values:this.valsList
        }
    }

    __formatOptions(){
        for (const option in this.options){
            if(this.options[option] === ''){
                delete this.options[option];
            }
        }
    }

    getHashes(){
        const hashString = this.hashGen.formatHashes(this.options).join(', ');
        const hashBuffer = Buffer.from(
            hashString,
            'utf-8'
        );

        const hashReadStream = new stream.PassThrough();
        hashReadStream.end(hashBuffer);

        return hashReadStream;
    }

}

module.exports = hashGenController;
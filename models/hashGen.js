class hashGen{
    constructor (params){
        this.keys = params.keys;
        this.values = params.values;
        this.object = this.__generateObjetct();
    }

    __generateObjetct(){
        const obj = {};
        this.keys.map((e,i) => {
            obj[e] = this.values[i];
        });
        return obj;
    }
    
    formatHashes({before="",between=" => ",after="",quoteFirst=false, quoteSecond=false} = {}){
        const hashArray = [];

        if(quoteFirst!==false) {
            before = before+"\"";
            between = "\""+between;
        }
        if(quoteSecond!==false) {
            between = between+"\"";
            after = "\""+after;
        }

        this.keys.map(e => {
            hashArray.push(before+String(e)+between+String(this.object[e])+after);
        });
        return hashArray;
    }
}

module.exports = hashGen;

class HashGen{
    constructor (params){
        this.keyArray = params.keys;
        this.valueArray = params.values;
        
        this.#generateObjetct();
    }

    #generateObjetct(){
        const newObject = {};
        this.keyArray.map((element,index) => {
            newObject[element] = this.valueArray[index];
        });
        this.object = newObject;
    }
    
    formatHashes({before="",between=" => ",after="",quoteFirst=false, quoteSecond=false} = {}){
        const hashArray = [];

        if(quoteFirst) {
            before = `${before}"`;
            between = `"${between}`;
        }
        if(quoteSecond) {
            between = `${between}"`;
            after = `"${after}`;
        }

        this.keyArray.map(e => {
            hashArray.push(before+String(e)+between+String(this.object[e])+after);
        });
        return hashArray;
    }
}

module.exports = HashGen;

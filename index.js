const hashgen = require('./hash-gen');
const myHashGen = new hashgen({keys:[1,2,3],values:['a','b','c']});

console.log(myHashGen.formatHashes().join("\n"));


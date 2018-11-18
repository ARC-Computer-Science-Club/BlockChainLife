const crypto = require('crypto');
const LinkedList = require('./linkedList.js');


function block(data, prev_hash)
{
    if (typeof data !== 'object') throw "Must be an object";

    this.prev_hash = prev_hash;
    this.data = data;
};


function blockChain(hash=undefined)
{
    this.linkedlist = new LinkedList();

    this.addBlock = function (value)
    {
        var hasher = crypto.createHash(hash || 'sha256');
        var previous_value = this.linkedlist.getTail();

        if (!previous_value) previous_value = "";
        else previous_value = JSON.stringify(previous_value);

        this.linkedlist.push(
            new block(
                value,
                hasher.update(previous_value).digest('hex'))
        );
    };

    this.printChain = function ()
    {
        this.linkedlist.search(alpha => {
            var hasher = crypto.createHash(hash || 'sha256');
            console.log('Block ' + hasher.update(JSON.stringify(alpha)).digest('hex') + ' \{');
            console.log('previous_hash ' + alpha.prev_hash);
            console.log('data ' + JSON.stringify(alpha.data));
            console.log('\}');
        });
    };
}

function Node(value, next=undefined) {
    this.value = value;
    this.next = next;
}

function LinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.push = function(value) {
        const newNode = new Node(value);

        if (this.tail)
        {
            this.tail.next = newNode;
        }
        else
        {
            this.head = newNode;
        }

        this.tail = newNode;

        // track total length
        this.length++;
    };

    this.at = function (index){
        let curr = this.head;
        if(this.length < index) throw "RANGE_ERROR";
        for(var i=0; i < index ; i++){
            curr = curr.next;
        }
        return curr.value;
    };

    this.getTail = function (){
        if (this.tail) return this.tail.value;
        return undefined;
    };

    this.search = function(success){
        let curr = this.head;
        let result = [];
        while(curr){
            var temp = success(curr.value);
            if (temp) result.push(temp);
            curr = curr.next;
        }
        return result;
    };

}

module.exports = LinkedList;

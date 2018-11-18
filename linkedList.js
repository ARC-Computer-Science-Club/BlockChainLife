function Node(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}

function LinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.addToHead = function(value) {
        const newNode = new Node(value, this.head, null);
        if (this.head) this.head.prev = newNode;
        else this.tail = newNode;
        this.head = newNode;
        this.length++;
    };

    this.addToTail = function(value) {
        const newNode = new Node(value, null, this.tail);
        if (this.tail) this.tail.next = newNode;
        else this.head = newNode;
        this.tail = newNode;
        this.length++;
    };

    this.at = function (index){
        let currentNode = this.head;
        if(this.length < index) throw "RANGE_ERROR";
        for(var i=0; i < index ; i++){
            currentNode = currentNode.next;
        }
        return currentnode.value;
    };

    this.search = function(success){
        let currentNode = this.head;
        while(currentNode){
            var temp = success(currentNode.value);
            if (temp) return temp;
        }
        return undefined;
    };

}


const list = new LinkedList();
list.addToHead(100);
list.addToHead(200);
console.log(list.search(alpha => {
    if (alpha > 50) return "Found";
    return undefined;
}));
console.log(list);

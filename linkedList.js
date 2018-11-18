function LinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
}
function Node(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}

LinkedList.prototype.addToHead = function(value) {
    const newNode = new Node(value, this.head, null);
    if (this.head) this.head.prev = newNode;
    else this.tail = newNode;
    this.head = newNode;
    this.length++;
};

LinkedList.prototype.addToTail = function(value) {
    const newNode = new Node(value, null, this.tail);
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;
    this.tail = newNode;
    this.length++;
};

LinkedList.prototype.at = function (index){
    let currentNode = this.head;
    if(this.length < index) throw "RANGE_ERROR";
    for(var i=0; i < index ; i++){
        currentNode = currentNode.next;
    }
    return currentnode.value;
};

/*
  assume searchValueFunction works like this:

  data.client = "jessica";
  data.client = "devin";

  function success (data) {
  if (data.client == "devin") return data.age;
  }

*/


LinkedList.prototype.search = function(success){
    let currentNode = this.head;
    while(currentNode){
        if temp = success(currentNode.value);
        if (temp) return temp;
    }

};

const list = new LinkedList();
list.addToHead(100);
list.addToHead(200);
console.log(list);

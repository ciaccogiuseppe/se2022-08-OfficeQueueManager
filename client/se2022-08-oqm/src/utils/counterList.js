/**
 * Constructor function for Service
 * @param {int} id 
 * @param {int} idmanager 
 */
 function Counter(){
    this.id = id;
    this.idmanager = idmanager;
}
function CounterList(){
    this.CounterList = [];
    this.addNewCounter = (Counter) => {this.CounterList.push(Counter)}
    this.length = this.CounterList.length;
}
export{Counter,CounterList}
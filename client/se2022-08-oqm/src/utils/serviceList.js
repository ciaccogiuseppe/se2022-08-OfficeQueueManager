/**
 * Constructor function for Service
 * @param {int} id 
 * @param {string} description
 * @param {int} idmanager 
 * @param {int} averagetime 
 */
function Service(){
    this.id = id;
    this.description = description;
    this.idmanager = idmanager;
    this.averagetime = averagetime;
}
function ServiceList(){
    this.ServiceList = [];
    this.addNewService = (Service) => {this.ServiceList.push(Service)}
    this.length = this.ServiceList.length;
}
export{Service,ServiceList}
/**
 * Constructor function for Service
 * @param {int} id 
 * @param {string} description
 * @param {int} averagetime 
 */
function Service(id,description,averagetime){
    this.id = id;
    this.description = description;
    this.averagetime = averagetime;
}
function ServiceList(){
    this.ServiceList = [];
    this.addNewService = (Service) => {this.ServiceList.push(Service)}
    this.length = this.ServiceList.length;
}
export{Service,ServiceList}
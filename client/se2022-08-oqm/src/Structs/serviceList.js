/**
 * Constructor function for Service
 * @param {int} id 
 * @param {string} description
 * @param {int} averagetime 
 */
function Service(id,name,description,averagetime,managerid){
    this.id = id;
    this.name = name;
    this.description = description;
    this.averagetime = averagetime;
    this.managerid = managerid;
    }
function ServiceList(){
    this.ServiceList = [];
    this.addNewService = (Service) => {this.ServiceList.push(Service)}
    this.length = this.ServiceList.length;
}
export{Service,ServiceList}
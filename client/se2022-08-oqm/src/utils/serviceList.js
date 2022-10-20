/**
 * Constructor function for Service
 * @param {int} id 
 * @param {string} description
 * @param {int} averagetime 
 * @param {string} name
 */
function Service(id,description,idmanager,averagetime,name){
    this.id = id;
    this.name = name;
    this.description = description;
    this.idmanager = idmanager;
    this.averagetime = averagetime;
    this.name = name;
}

function ServiceList(){
    this.ServiceList = [];
    this.addNewService = (Service) => {this.ServiceList.push(Service)}
    this.length = this.ServiceList.length;
}
export{Service,ServiceList}

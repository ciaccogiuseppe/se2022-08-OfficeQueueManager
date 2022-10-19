/**
 * Constructor function for Job
 * @param {int} id 
 * @param {int} idcounter
 * @param {int} idservice
 * @param {int} idmanager
 */
 function Job(id,idcounter,idservice,idmanager){
    this.id = id;
    this.idcounter = idcounter;
    this.idservice = idservice;
    this.idmanager = idmanager;
}
function JobList(){
    this.JobList = [];
    this.addNewJob = (Job) => {this.JobList.push(Job)}
    this.length = this.JobList.length;
}
export{Job,JobList}
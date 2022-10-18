import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
//import {Service, ServiceList} from "../utils/serviceList";
//import API from './API'




export default function DefineService() {
    const [serviceID, setServiceID] = useState(null);
    const [serviceDescription, setServiceDescription] = useState(null);
    const [serviceTime, setServiceTime] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((serviceID) && (serviceDescription) && (serviceTime)){
            console.log(serviceDescription, serviceID, serviceTime)
            window.alert("Service defined.")
            setServiceDescription(null)
            setServiceID(null)
            setServiceTime(null)

            
            /*
            var service = new Service ({serviceID}, {serviceDescription}, {serviceTime})
            ServiceList.addNewService(service)
            API.postService(service).then(
                window.alert("Service defined.")
            )*/
            
        } else {
            console.log(serviceDescription, serviceID, serviceTime)
            window.alert("Please complete all the fields.")
            setServiceDescription(null)
            setServiceID(null)
            setServiceTime(null)
        }
        
    } 
    

    return(
        <>
            <Typography variant="h4" marginTop={15} gutterBottom>
                Define a service
            </Typography>
            <Grid containers item sm>
                <form onSubmit={handleSubmit}>
                    <Grid containers item sm marginTop={3}>
                        <TextField id="filled-input" label="Service name" variant="filled" onChange={e => setServiceID(e.target.value)}/>
                    </Grid>
                    <Grid containers item sm marginTop={3}>
                        <TextField sx={{ m: 1, width: '25ch' }} id="filled-input" label="Service description" variant="filled" multiline rows={4} onChange={e => setServiceDescription(e.target.value)}/>
                    </Grid>
                    <Grid containers item sm marginTop={3}>
                        <TextField id="filled-input" type="number" InputProps={{ inputProps: { min: "1", step: "1" } }} label="Estimated time (in minutes)" variant="filled" onChange={e => setServiceTime(e.target.value)}/>
                    </Grid>
                    <Grid containers marginTop={5}>
                        <Button variant="contained" type="submit">Add service</Button>
                    </Grid>
                </form>
                <Grid containers item sm marginTop={5}>
                    <Button component={Link} to={"/manager"} variant="contained">Go back</Button>
                </Grid>
            </Grid>

        </>
    )
}

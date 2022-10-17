import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
//import {Service, ServiceList} from "../Structs/serviceList";



export default function AssignServiceToCounter() {
    const [serviceID, setServiceID] = useState(null);
    const [counterName, setCounterName] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
    } 
    

    return(
        <>
            <Typography variant="h4" marginTop={15} gutterBottom>
                Assign services to a counter
            </Typography>
            <Grid containers item sm>
                <Grid containers item sm marginTop={5}>
                    <Button variant="contained" onClick={handleSubmit}>Assign</Button>
                </Grid>
                <Grid containers item sm marginTop={5}>
                    <Button component={Link} to={"/manager"} variant="contained">Go back</Button>
                </Grid>
            </Grid>

        </>
    )
}

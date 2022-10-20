import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";

import API from '../API'




export default function DefineService() {
    const [serviceID, setServiceID] = useState(null);
    const [serviceDescription, setServiceDescription] = useState(null);
    const [serviceTime, setServiceTime] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((serviceID) && (serviceDescription) && (serviceTime)){
            console.log(serviceDescription, serviceID, serviceTime)
            window.alert("Service defined.")

            API.postService(serviceID,serviceDescription,serviceTime);


            
        } else {
            console.log(serviceDescription, serviceID, serviceTime)
            window.alert("Please complete all the fields.")

        }
        
    } 
    

    return(
        <>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>
            
            
                        <Typography variant="h4" marginTop={8} gutterBottom>
                            <br/>Define a service
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

                        
                        <Typography variant="h5" gutterBottom>
                            <br/>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>

        </>
    )
}

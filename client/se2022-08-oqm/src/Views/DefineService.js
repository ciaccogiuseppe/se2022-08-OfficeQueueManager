import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Link, Navigate} from "react-router-dom";
import Success from "../Component/Success"



export default function DefineService() {
    const [serviceName, setServiceName] = useState();
    const [serviceDescription, setServiceDescription] = useState();

    const [authenticated, setauthenticated] = useState(
        (localStorage.getItem("authenticated") || false)
    );

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
          setauthenticated(loggedInUser);
          
        }
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (serviceName != null && serviceDescription != null ){
            window.alert("Service defined.")
        } else if (serviceName != null && serviceDescription == null){
            window.alert("Please enter a description.")
        } else if (serviceName == null && serviceDescription != null){
            window.alert("Please enter a service name.")
        } else {
            window.alert("Please enter a service name and its description.")
        }
        /*
        let service = (serviceName, serviceDescription)
        postService(service).then(
            window.alert("Service defined.")
        )
        */
        
    } 
    
    if (!authenticated) {
        return <Navigate replace to="/manager-login" />;
    } else {

        return(
            <>
                <Typography variant="h4" marginTop={15} gutterBottom>
                    Define a service
                </Typography>
                <Grid containers item sm>
                    <form onSubmit={handleSubmit}>
                        <Grid containers item sm marginTop={3}>
                            <TextField id="filled-input" label="Service name" variant="filled" onChange={e => setServiceName(e.target.value)}/>
                        </Grid>
                        <Grid containers item sm marginTop={3}>
                            <TextField id="filled-input" label="Service description" variant="filled" onChange={e => setServiceDescription(e.target.value)}/>
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
    };
}
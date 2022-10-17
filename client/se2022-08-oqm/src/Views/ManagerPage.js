import React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import API from './API'

function ManagerPage() {
    const navigate = useNavigate();


    const handleLogout = async (e) => {
        e.preventDefault();
        await API.logOut();
        navigate("/manager-login");
        
    }

    return (
        
        <div>
            <Typography variant="h4" gutterBottom marginTop={15}>
                Manager Page
            </Typography>
            <Grid containers item sm marginTop={3}>
                <Button component={Link} to={"./addcounter"} variant="contained">Add a counter</Button>
            </Grid>
            <Grid containers item sm marginTop={3}>
                <Button component={Link} to={"./defineservice"} variant="contained">Define a service</Button>
            </Grid>
            <Grid containers item sm marginTop={3}>
                <Button component={Link} to={"./assign"} variant="contained">Assign services to a counter</Button>
            </Grid>
            <Grid containers item sm marginTop={3}>
                <Button onClick={handleLogout} variant="outlined">Logout</Button>
            </Grid> 
        </div>
    )}


export default ManagerPage;


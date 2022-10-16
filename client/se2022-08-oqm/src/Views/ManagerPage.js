import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

function ManagerPage( {onLogout, token }) {
    
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
                <Button onClick={onLogout} variant="outlined">Logout</Button>
            </Grid> 
        </div>
    );
}

export default ManagerPage;


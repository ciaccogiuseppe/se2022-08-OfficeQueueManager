import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Login from "../Component/Login";







function LoginOfficer() {

    
    return (
        <div>
            <Typography variant="h4" marginTop={10} gutterBottom>
                Officer login
            </Typography>
            <Grid containers item sm>
                <Login/>
            </Grid>
            <Grid containers item sm marginTop={5}>
                <Button component={Link} to={"/"} variant="contained">Go back</Button>
            </Grid>
            
        </div>
    );
}

export default LoginOfficer;
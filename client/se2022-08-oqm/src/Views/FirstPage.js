import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";




function FirstPage() {
    
    return (
        <div>
            <Typography variant="h4" marginTop={30} gutterBottom>
                Click on your profile
            </Typography>
            <Grid container>
                <Grid containers marginTop={7} item sm>
                    <Button component={Link} to={"/client"} variant="contained">I&apos;m a <br/>client</Button>
                </Grid>
                <Grid containers marginTop={7}>
                    <Button component={Link} to={"/officer-login"} variant="contained">{"I'm an"} <br/>officer</Button>
                </Grid>
                <Grid containers marginTop={7} item sm>
                    <Button component={Link} to={"/manager-login"} variant="contained">I&apos;m a <br/>manager</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FirstPage;


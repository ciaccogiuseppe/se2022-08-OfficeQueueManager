import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";






function FirstPage() {
    
    return (
        <div>
            <Typography variant="h1" gutterBottom>
                Manager Page
            </Typography>
            <Grid container>
                <Grid containers item sm>
                    <Button component={Link} to={"/addcounter"} variant="contained">Add a counter</Button>
                </Grid>
                <Grid containers>
                    <Button component={Link} to={"/defineservice"} variant="contained">Define a service</Button>
                </Grid>
                <Grid containers item sm>
                    <Button component={Link} to={"/assign"} variant="contained">Assign services to a counter</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FirstPage;


import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";






function ClientPage() {
    
    return (
        <div>
            <Grid containers item sm marginTop={5}>
                <Button component={Link} to={"/"} variant="contained">Go back</Button>
            </Grid>
            <Typography variant="h4" marginTop={30} gutterBottom>
                Client Page
            </Typography>
            <Grid container>
                <Grid containers marginTop={7} item sm>
                    <Button component={Link} to={"/client/ticket"} variant="contained">Get a ticket</Button>
                </Grid>
                <Grid containers marginTop={7} item sm>
                    <Button component={Link} to={"/client/mainboard"} variant="contained">Main Board</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default ClientPage;
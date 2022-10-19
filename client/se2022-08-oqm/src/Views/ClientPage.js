import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";


function ClientPage() {

    return (
        <div>
            <Grid container item sm marginTop={3} marginLeft={3}>
                <Button component={Link} to={"/"} variant="contained">Go back</Button>
            </Grid>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>

                        <Typography variant="h4" marginTop={10} gutterBottom>
                            Client Page
                        </Typography>
                        <Grid container>
                            <Grid containers marginTop={7} marginBottom={3} item sm>
                                <Button component={Link} to={"/client/ticket"} variant="contained">Get a ticket</Button>
                            </Grid>
                            <Grid containers marginTop={7} marginBottom={3} item sm>
                                <Button component={Link} to={"/client/mainboard"} variant="contained">Main Board</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
        </div>
    );
}

export default ClientPage;
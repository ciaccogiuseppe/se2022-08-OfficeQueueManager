import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";




function FirstPage() {
    
    return (
        <div>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>



                        <Typography variant="h4" marginTop={8} gutterBottom>
                            <br/>Click on your profile
                        </Typography>
                        <Grid container>
                            <Grid marginTop={7} item sm>
                                <Button component={Link} to={"/client"} variant="contained">I&apos;m a <br/>client</Button>
                            </Grid>
                            <Grid marginTop={7}>
                                <Button component={Link} to={"/officer"} variant="contained">{"I'm an"} <br/>officer</Button>
                            </Grid>
                            <Grid marginTop={7} item sm>
                                <Button component={Link} to={"/manager-login"} variant="contained">I&apos;m a <br/>manager</Button>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom>
                            <br/>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}

export default FirstPage;


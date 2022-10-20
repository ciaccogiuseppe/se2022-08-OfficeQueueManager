import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";
import API from '../API';



export default function AddCounter() {
    const [countername, setCounterName] = useState();
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (countername){
            window.alert("Counter added.")
            API.postCounter();

        } else {
            window.alert("Please enter a counter name.")
        }
        
    } 
   

    return(
        <>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>


                        <Typography variant="h4" marginTop={8} gutterBottom>
                            <br/>Add a counter
                        </Typography>
                        <Grid containers item sm>
                            

                                <form onSubmit={handleSubmit}>
                                    <Grid containers item sm marginTop={3}>
                                        <TextField id="filled-input" label="Counter name" variant="filled" onChange={e => setCounterName(e.target.value)}/>
                                    </Grid>
                                    <Grid containers marginTop={5}>
                                        <Button variant="contained" type="submit">Add counter</Button>
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
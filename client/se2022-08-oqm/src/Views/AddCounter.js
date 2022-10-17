import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";



export default function AddCounter() {
    const [countername, setCounterName] = useState();
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (countername){
            window.alert("Counter added.")
            /*
            postCounter(countername).then(
                window.alert("Counter added.")
            )
            */
        } else {
            window.alert("Please enter a counter name.")
        }
        
    } 
   

    return(
        <>
            <Typography variant="h4" marginTop={15} gutterBottom>
                Add a counter
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

        </>
    )
}
import React , {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import TextField from "@mui/material/Textfield";




function LoginOfficer( {onLogin}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    return (
        <div>
            <Typography variant="h4" marginTop={15} gutterBottom>
                Officer login
            </Typography>
            <Grid containers item sm>
                <form /*onSubmit={handleSubmit}*/>
                    <Grid containers item sm marginTop={3}>
                        <TextField id="filled-input" label="Username" variant="filled" onChange={e => setUsername(e.target.value)}/>
                    </Grid>
                    <Grid containers marginTop={3}>
                        <TextField id="filled-password-input" label="Password" type="password" variant="filled" onChange={e => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid containers marginTop={5}>
                        <Button variant="contained" type="submit" onClick={onLogin}>Validate</Button>
                    </Grid>
                </form>
            </Grid>
            <Grid containers item sm marginTop={5}>
                <Button component={Link} to={"/"} variant="contained">Go back</Button>
            </Grid>
            
        </div>
    );
}

export default LoginOfficer;
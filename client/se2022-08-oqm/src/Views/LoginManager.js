import React , {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/Textfield";
import API from './API'
import Paper from "@mui/material/Paper";


import {Link, useNavigate} from "react-router-dom";


function LoginManager() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const credentials = { username, password}
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = [];
        if (username === ''){
            valid.push(" username");
        }
        if (password === ''){
            valid.push(" password");
        }
        if (valid.length === 0){
            API.logIn(credentials).then(
                navigate("/manager")
            )
            console.log(credentials);

        }
    }
    

    return (
        <div>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper elevation={3}>
            


                        <Typography variant="h4" marginTop={8} gutterBottom>
                            <br/>Manager login
                        </Typography>
                        <Grid containers item sm>
                            <form onSubmit={handleSubmit}>

                                <Grid containers item sm marginTop={3}>
                                    <TextField id="filled-input" label="Email" variant="filled" onChange={e => setUsername(e.target.value)}/>
                                </Grid>
                                <Grid containers marginTop={3}>
                                    <TextField id="filled-password-input" label="Password" type="password" variant="filled" onChange={e => setPassword(e.target.value)}/>
                                </Grid>
                                <Grid containers marginTop={5}>
                                    <Button variant="contained" type="submit">Validate</Button>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid containers item sm marginTop={5}>
                            <Button component={Link} to={"/"} variant="contained">Go back</Button>
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
};

export default LoginManager;
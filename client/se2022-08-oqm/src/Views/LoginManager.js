import React , {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/Textfield";

import {Link, useNavigate} from "react-router-dom";

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications


function LoginManager() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    //we store the authentication status on local storage
    const [authenticated, setauthenticated] = useState(
        (localStorage.getItem("authenticated") || false)
    );


    //to replace with api calls
    const users = [{ username: "Jane", password: "testpassword" }];
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            localStorage.setItem("authenticated", true);
            navigate("/manager");
        }
    };

    return (
        <div>
            <Typography variant="h4" marginTop={15} gutterBottom>
                Manager login
            </Typography>
            <Grid containers item sm>
                <form onSubmit={handleSubmit}>

                    <Grid containers item sm marginTop={3}>
                        <TextField id="filled-input" label="Username" variant="filled" onChange={e => setUsername(e.target.value)}/>
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
            
        </div>
    );
}

export default LoginManager;
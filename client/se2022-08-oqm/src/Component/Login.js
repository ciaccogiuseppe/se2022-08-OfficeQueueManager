import React , {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';




//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications



async function loginUser(credentials) {
return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
})
    .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }

    return (
        <div component="div">
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
        
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

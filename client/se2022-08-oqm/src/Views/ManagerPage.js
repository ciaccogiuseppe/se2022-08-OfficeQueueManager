import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link, useNavigate, Navigate} from "react-router-dom";

function ManagerPage() {
    const navigate = useNavigate();

    const [authenticated, setauthenticated] = useState(
        (localStorage.getItem("authenticated") || false)
    );

    const handleLogout = (e) => {
        e.preventDefault();

        //logOut()
        setauthenticated(false)
        localStorage.setItem("authenticated", false);
        navigate("/manager-login");
        
    }
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
          setauthenticated(loggedInUser);
        }
        console.log (authenticated)

        if (!authenticated) {
            console.log("cc")
            navigate("/manager-login");
        }
    }, []);

    
    

    return (
        
        <div>
            <Typography variant="h4" gutterBottom marginTop={15}>
                Manager Page
            </Typography>
            <Grid containers item sm marginTop={3}>
                <Button component={Link} to={"./addcounter"} variant="contained">Add a counter</Button>
            </Grid>
            <Grid containers item sm marginTop={3}>
                <Button component={Link} to={"./defineservice"} variant="contained">Define a service</Button>
            </Grid>
            <Grid containers item sm marginTop={3}>
                <Button component={Link} to={"./assign"} variant="contained">Assign services to a counter</Button>
            </Grid>
            <Grid containers item sm marginTop={3}>
                <Button onClick={handleLogout} variant="outlined">Logout</Button>
            </Grid> 
        </div>
    )}


export default ManagerPage;


import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import API from './API'


import {Link} from "react-router-dom";
//import {Service, ServiceList} from "../Structs/serviceList";



export default function AssignServiceToCounter() {
    const listServices = ['serv1','serv2','serv3', 'serv4', 'serv5']
    const listCounters = ['count1','count2','count3', 'count4', 'count5']
    const [checked, setChecked] = useState([]);
    const [counterValue, setValue] = React.useState(listCounters[0]);



    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        //console.log(newChecked)

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        //console.log(value)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(checked)

        checked.map((serviceValue) => API.assignServicetoCounter(counterValue,serviceValue).then(
                window.alert(serviceValue+' assigned to '+ counterValue)
            )
        );
    } 

    return(
        <>
            <Typography variant="h4" marginTop={15} >
                Assign services to a counter
            </Typography>
            <Box>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={4}>
                        <Paper elevation={3} >

                            <Typography variant="h5" marginTop={3} gutterBottom>
                                <br/>Select the service(s) to assign
                            </Typography>

                            <Grid container>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {listServices.map((value) => { 
                                            const labelId = `checkbox-list-label-${value}`;
                                            return(
                                                <ListItem key={value} disablePadding >
                                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox edge="start" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`${value}`} />
                                                </ListItemButton>
                                            </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>

                            <Typography variant="h5" gutterBottom>
                                <br/>
                            </Typography>
                          
                        </Paper>
                    </Grid>

                    <Grid item xs={4} >
                        <Paper elevation={3} >

                            <Typography variant="h5" marginTop={3} gutterBottom>
                                <br/>Select a counter
                            </Typography>

                            <Grid container>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>

                                    <FormControl>
                                        <RadioGroup value={counterValue} onChange={handleChange}>
                                            {listCounters.map((value) => { 
                                                    return(
                                                        <FormControlLabel value={value} control={<Radio />} label={value}/>
                                                    );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                            
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>

                            <Typography variant="h5" gutterBottom>
                                <br/>
                            </Typography>

                        </Paper>
                    </Grid>

                    <Grid item xs={2}></Grid>
                    

                </Grid>
            </Box>
            
            <Grid containers item sm>
                <Grid containers item sm marginTop={5}>
                    <Button variant="contained" onClick={handleSubmit}>Assign</Button>
                </Grid>
                <Grid containers item sm marginTop={5}>
                    <Button component={Link} to={"/manager"} variant="contained">Go back</Button>
                </Grid>
            </Grid>

        </>
    )
}

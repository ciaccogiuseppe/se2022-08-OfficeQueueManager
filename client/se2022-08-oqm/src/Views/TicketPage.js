import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ServiceTable from '../Component/ServiceTable';
import API from '../API';
import { Service, ServiceList } from '../Structs/serviceList';
import { Paper } from '@mui/material';

function TicketPage(props) {
    const [services, setServices] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [xTime, setXTime] = React.useState(0);


    React.useEffect(() => {
        const loadServices = async () => {
            const s = await API.getAllServices();
            setServices(() => s);
        }
        if (services === false) {
            loadServices();
        }
    }, [services]);



    React.useEffect(() => {
        if (selected) {
            expectedTime();
        }
    }, [selected.id]);

    const expectedTime = async () => {
        const t = await API.getXTime(selected.id);
        setXTime(t);
    }

    const print = async (service) => {
        const ticket = await API.postTicket(service);

        //debug
        //const ticket = 23;

        console.log("Print ticket:");
        console.log(ticket);
        window.alert("Your ticket number is " + ticket);
        setSelected(() => false);
    }

    return (
        <>
            <Typography variant="h2" marginTop={3}>
                Office Queue Manager
            </Typography>
            <Typography variant="h5" gutterBottom>
                Select a service among the available ones, look how much you will wait and get your ticket!
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <ServiceTable services={services} selected={selected} setSelected={setSelected} />
                    </Grid>
                    <Grid item xs={7}>
                        <Paper elevation={3}>
                            <Typography variant="h3" gutterBottom>
                                {selected ? selected.name : false}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {selected ? selected.description : false}
                            </Typography>
                            <Typography variant="h5" gutterBottom bgcolor='red'>
                                {selected ? "Expected time to wait: " + xTime + " minutes" : false}
                            </Typography>
                            {selected ?
                                <Grid container item>
                                    <Button variant="contained" onClick={() => setSelected(false)} sx={{ margin: 1 }}>Cancel</Button>
                                    <Button variant="contained" onClick={() => print(selected)} color="success" sx={{ margin: 1 }}>Get ticket</Button>
                                </Grid> : false}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

//debug
const mockList = new ServiceList();
mockList.addNewService(new Service(1, "Consists in service 1", 5, "Service 1"));
mockList.addNewService(new Service(2, "Consists in service 2", 10, "Service 2"));
mockList.addNewService(new Service(3, "Consists in service 3", 15, "Service 3"));
mockList.addNewService(new Service(4, "Consists in service 4", 20, "Service 4"));
mockList.addNewService(new Service(5, "Consists in service 5", 25, "Service 5"));

export default TicketPage;
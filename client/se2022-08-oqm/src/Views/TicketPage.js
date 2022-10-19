import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ServiceTable from '../Component/ServiceTable';
import API from '../API';
import { Service, ServiceList } from '../Structs/serviceList';

function TicketPage(props) {
    const [services, setServices] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [xTime, setXTime] = React.useState(0);


    React.useEffect(() => {
        const loadServices = async () => {
            //const s = await API.getAllServices();
            //debug
            const s = mockList;

            setServices(() => s);
        }
        loadServices();
    }, []);



    React.useEffect(() => {
        const expectedTime = async () => {
            const t = await API.getXTime(selected);
            setXTime(() => t);
        }
        if(selected){
            expectedTime();
        }
    }, [selected.id]);

    const print = async (service) => {
        const ticket = await API.postTicket(service);

        console.log("Print ticket:");
        console.log(ticket);
    }

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Office Queue Manager
            </Typography>
            <Typography variant="h5" gutterBottom>
                Select a service among the available ones, look how much you will wait and get your ticket!
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ServiceTable services={services} selected={selected} setSelected={setSelected} />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h3" gutterBottom>
                            {selected ? selected.name : false}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {selected ? selected.description : false}
                        </Typography>
                        <Typography variant="h5" gutterBottom bgcolor='red'>
                            {selected ? "Expected time to wait: " + xTime : false}
                        </Typography>
                        {selected ?
                            <Grid container item>
                                <Button variant="contained" onClick={() => setSelected(false)} sx={{ margin: 1 }}>Cancel</Button>
                                <Button variant="contained" onClick={() => print(selected)} color="success" sx={{ margin: 1 }}>Get ticket</Button>
                            </Grid> : false}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

//debug
const mockList = new ServiceList();
mockList.addNewService(new Service(1, "Service 1", "Consists in service 1", 5));
mockList.addNewService(new Service(2, "Service 2", "Consists in service 2", 10));
mockList.addNewService(new Service(3, "Service 3", "Consists in service 3", 15));
mockList.addNewService(new Service(4, "Service 4", "Consists in service 4", 20));
mockList.addNewService(new Service(5, "Service 5", "Consists in service 5", 25));

export default TicketPage;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ServiceTable from '../Component/ServiceTable';
import API from '../API';

function TicketPage(props) {
    [services, setServices] = React.useState(() => API.getAllServices());
    [selected, setSelected] = React.useState(false);
    [xTime, setXTime] = React.useState(0);

    useEffect(() => {
        setXTime(() => API.getXTime(selected));
    }, [selected.id]);

    const print = (service) => {
        API.postTicket(/* to define */);
    
        console.log("Print ticket:");
        console.log(ticket);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ServiceTable services={services} selected={selected} setSelected={setSelected} />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h3" gutterBottom>
                        {selected ? false : selected.name}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {selected ? false : selected.description}
                    </Typography>
                    <Typography variant="h4" gutterBottom bgcolor='red'>
                        Expected time to wait: {xTime}
                    </Typography>
                    <Grid containers item sm>
                        <Button variant="contained" onClick={() => setSelected(false)} >Cancel</Button>
                    </Grid>
                    <Grid containers item sm>
                        <Button variant="contained" onClick={() => print(selected)} >Get ticket</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TicketPage;
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function ServiceTable(props){ 
    //props.services is a serviceList object
    //props.selected is the service object selected or false
    //props.setSelected is the callback to select a service

    return (
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {props.services ? props.services.ServiceList.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => props.setSelected(row)}
                >
                  <TableCell scope="row">
                    {row.name} 
                  </TableCell>
                </TableRow>
              )) : false}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default ServiceTable;
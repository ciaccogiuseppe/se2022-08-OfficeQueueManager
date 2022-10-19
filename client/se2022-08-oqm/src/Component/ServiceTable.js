import React , {useState} from 'react';

function ServiceTable(props){ 
    //props.services is a serviceList object
    //props.selected is the service object selected or undefined
    //props.setSelected is the callback to select a service

    return (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {props.services.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => props.setSelected(row)}
                  active={selected && row.id === props.selected.id /*a selected object exists, and his id is equal to the current one.*/}
                >
                  <TableCell component="tr" scope="row">
                    {row.name} 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default ServiceTable;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import history from "../history";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {red} from "@material-ui/core/colors";


function createData(cols,o) {
    var dataFromCols ={};
    cols.forEach(c =>{
        if(o.hasOwnProperty(c.id)){
            dataFromCols[c.id]=o[c.id];
        }
    });

    rows.push(dataFromCols)
}
var rows=[];
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable(props) {
    const dataCols = props.cols;
    const dataRow = props.rows;
    rows = [];
    dataRow.forEach((r)=>{createData(dataCols,r)});


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {dataCols.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell key={"actions"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >{/*onClick={() => console.log(row.id)}>*/}
                                    {dataCols.map((column) => {
                                        const value = row[column.id];
                                        console.log("valores");
                                        console.log(value);
                                        if(value === true){
                                            return <TableCell key={column.id} align={column.align}>
                                                <CheckIcon onClick={()=>console.log("habilitar elemento de id: " + row.id)}/>
                                            </TableCell>
                                        }
                                        if(value === false){
                                            return <TableCell key={column.id} align={column.align} >
                                                <CloseIcon onClick={()=>console.log("inhabilitar elemento de id: " + row.id)} />
                                            </TableCell>
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align} onClick={() => history.push('/device')}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell key={"delt" + row.id}>
                                        <EditIcon color="primary" onClick={()=>console.log("editar elemento de id: " + row.id)}/>
                                        <DeleteIcon style={{color: red[300]}} onClick={()=>console.log("eliminar elemento de id: " + row.id)}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

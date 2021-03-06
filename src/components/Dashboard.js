import React from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Form from "@rjsf/material-ui"
import {getCreateDeviceForm} from "../services/apiService";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import DashboardIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListAltIcon from '@material-ui/icons/ListAlt';
import DevicesIcon from '@material-ui/icons/Devices';
import devices from "./devices";
import "../styles/table.css"
import TableDevices from "./TableDevices";
import pools from "./pools";
import schemaDevice from "../Forms/deviceSchemaForm";
import schemaPool from "../Forms/poolSchemaForm";
import Graph from "../pages/Graph";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import StorageIcon from '@material-ui/icons/Storage';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',        height: 600,

        flexDirection: 'column',
    },
    fixedHeight: {
    },
}));

var settings = {
    cellClass: function( current, key, item){
        return current + ' cell_' + key + item.age;
    },
    classPrefix: 'mytable',
    header: true,
    headerClass: function( current, key ){
        if( key == 'color')
            return current + ' imblue';
        return current;
    },
    keyField: 'name',
    noRowsMessage: 'Where are my rows?',
    rowClass: function( current, item ){
        return current + ' row_' + item.name;
    }
};


const schema = {
    properties: {
        coordinates: {
            type: 'string',
            title: 'Coordinates',
        },
        enabled: {
            type: 'boolean',
            title: 'Enabled',
        },
        id: {
            type: 'integer',
            title: 'id',
        },
        metadata:{
            type: 'string',
            title: 'metadata',
        },
        name:{
            type: 'string',
            title: 'Name',
        },
        port_channels: {
            type: 'string',
            title: 'Port Channels',
        },
        tags:{
            type: 'string',
            title: 'Tags'
        },
        // type:{},
        // coordinates_offset:{},
    }
};

const deviceColumns = [
    { id: 'id', label: 'ID', minWidth: 170},
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'enabled', label: 'Enable', minWidth: 100 },
    { id: 'ip_address', label: 'IP address', minWidth: 100 },
];

const poolColumns = [
    {id: 'id', label: 'ID', minWidth:170},
    {id: 'name', label: 'Name'},
    {id: 'subnets', label: 'Subnets'},
];


export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [schemaApi, setSchema] = React.useState(schemaDevice);
    const [cols, setCols] = React.useState(deviceColumns);
    const [rows, setRows] = React.useState(devices);
    const [showGraph, setShowGraph] = React.useState(false);

    const history = useHistory();
    const navigateToGraph = () => history.push('/graph');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log("showGraph esta en ");
    console.log(showGraph);
    if(showGraph === true){
        return (
            <div className={classes.root}>
                {console.log("entro")}
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" onClick={async ()=> {
                                    const myDevices = await getCreateDeviceForm();
                                    // setSchema(myDevices.data)
                                    console.log(myDevices.data);
                                }} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon>
                                    <DevicesIcon />
                                </ListItemIcon>
                                <ListItemText primary="Devices"  onClick={()=>{
                                    setShowGraph(false);
                                    setSchema(schemaDevice);
                                    setCols(deviceColumns);
                                    setRows(devices);
                                }}/>
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon>
                                    <ListAltIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Pools" onClick={()=>{
                                    setShowGraph(false);
                                    setSchema(schemaPool);
                                    setRows(pools);
                                    setCols(poolColumns);
                                }} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon>
                                    <ListAltIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Graph" onClick={navigateToGraph} />
                            </ListItem>
                        </div>
                    </List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg"  className={classes.container}>
                        <Grid container spacing={3}>
                           <Graph/>
                        </Grid>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        );
    }else{
        return (
            <div className={classes.root}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" onClick={async ()=> {
                                    const myDevices = await getCreateDeviceForm();
                                    // setSchema(myDevices.data)
                                    console.log(myDevices.data);
                                }} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon>
                                    <DevicesIcon onClick={()=>{
                                        setShowGraph(false);
                                        setSchema(schemaDevice);
                                        setCols(deviceColumns);
                                        setRows(devices);
                                    }}/>
                                </ListItemIcon>
                                <ListItemText primary="Devices"  onClick={()=>{
                                    setShowGraph(false);
                                    setSchema(schemaDevice);
                                    setCols(deviceColumns);
                                    setRows(devices);
                                }}/>
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon>
                                    <StorageIcon nClick={()=>{
                                        setShowGraph(false);
                                        setSchema(schemaPool);
                                        setRows(pools);
                                        setCols(poolColumns);
                                    }}/>
                                </ListItemIcon>
                                <ListItemText primary="Pools" onClick={()=>{
                                    setShowGraph(false);
                                    setSchema(schemaPool);
                                    setRows(pools);
                                    setCols(poolColumns);
                                }} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon>
                                    <BubbleChartIcon onClick={() => {setShowGraph(true)}} />
                                </ListItemIcon>
                                <ListItemText primary="Graph" onClick={() => {setShowGraph(true)}} />
                            </ListItem>
                        </div>
                    </List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg"  className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TableDevices title={"List"} cols={cols} rows={rows}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {/*<Form />*/}
                                    <Form schema={schemaApi}
                                          onChange={console.log()}
                                          onSubmit={onSubmit}
                                          onError={console.log("errors")} theme={{}}/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        );
    }

}
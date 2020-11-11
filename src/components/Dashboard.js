import React from 'react';
import clsx from 'clsx';
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
import {JsonToTable} from "react-json-to-table";
import devices from "./devices"
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

//TODO: bring from api
const schemaDevice = {
    title: "Device",
    description: "device creation form",
    type: "object",
    required: ["name"],
    properties: {
        name: {type: "string", title: "name"},
        enable: {type: "boolean", title: "enabled", default: false},
        ip: {type: "string", title: "IP"},
        tags: {
            title: "Tags",
            type: "array",
            items: {
                type: "object",
                properties: {
                    tag: {
                        title: "Tag",
                        type: "string",
                        default: "tag name"
                    }
                }
            }
        },
        port_channels: {
            title: "Port Channels",
            type: "array",
            items: {
                type: "object",
                properties: {
                    portChannel: {
                        title: "Port Channel",
                        type: "string",
                        default: "port channel"
                    }
                }
            }
        },
        "Ports Con puertos": {
            "type": "array",
            "title": "Ports con Puertos",
            "items": {
                "type": "array",
                "title": "Puertos",
                "items": {
                    properties: {
                        portChannel: {
                            title: "Port Channel",
                            type: "string",
                            default: "port channel"
                        },
                        tag: {
                            title: "Tag",
                            type: "string",
                            default: "tag name"
                        },
                        enable: {type: "boolean", title: "enabled", default: false},
                        listPorts:{
                            type: "integer",
                            title: "puertos disponibles",
                            enum:[
                                8080,
                                9090,
                                3336
                            ]
                        }
                    }
                }
            }
        },
    }
};

const schemaPool = {
    title: "Pool",
    description: "pool creation form",
    type: "object",
    required: ["name"],
    properties: {
        name: {type: "string", title: "name"},
        subnets: {
            title: "Subnets",
            type: "array",
            items: {
                type: "object",
                properties: {
                    tag: {
                        title: "Subnet",
                        type: "string",
                        default: "subnet_01"
                    }
                }
            }
        },
    }
};
const myJson = {
    "Student": { name: "Jack", email: "jack@xyz.com" },
    "Student id": 888,
    "Sponsors": [
        { name: "john", email: "john@@xyz.com" },
        { name: "jane", email: "jane@@xyz.com" }
    ]
};
const otherJson= {
    "Devices":[
        {
            "coordinates": {
                "latitude": -33.3185398,
                "longitude": -71.4240873
            },
            "enabled": true,
            "id": 1,
            "ip_address": "10.100.14.225",
            "metadata": {
                "city": "Casablanca",
                "country": "Chile",
                "telemetry_ip_address": "10.100.64.15/24"
            },
            "name": "cas-cassini-00",
            "port_channels": {},
            "tags": [
                "core",
                "cas",
                "v_costa",
                "cassini"
            ],
            "type": "Cassini"
        },
        {
            "coordinates": {
                "latitude": -33.3580075,
                "longitude": -70.6779696
            },
            "coordinates_offset": {
                "latitude": 0.05,
                "longitude": 0
            },
            "enabled": true,
            "id": 2,
            "ip_address": "10.100.14.131",
            "metadata": {
                "city": "Huechuraba",
                "country": "Chile"
            },
            "name": "clk-cassini-00",
            "port_channels": {},
            "tags": [
                "core",
                "clk",
                "metro_scl",
                "cassini"
            ],
            "type": "Cassini"
        }
    ]
};
const schemaTable = {
    properties: {
        name: {
            type: 'string',
            title: 'Name',
        },
    }
};


var items = [
    { name: 'Louise', age: 27, color: 'red' },
    { name: 'Margaret', age: 15, color: 'blue'},
    { name: 'Lisa', age:34, color: 'yellow'}
];

var columns = [
    'name',
    {key: 'age', label: 'Age'},
    {key: 'color', label: 'Colourful', cell: function( item, columnKey ){
            return <span style={{color: item.color}}>{ item.color }</span>;
        }}
];
export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const [schemaApi, setSchema] = React.useState(schemaDevice);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
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
                            <ListItemText primary="Devices"  onClick={()=>{setSchema(schemaDevice)}}/>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <ListAltIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Pools" onClick={()=>{setSchema(schemaPool)}} />
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
                            <Paper className={fixedHeightPaper}>
                                {/*<Table />*/}
                                <JsonToTable json={devices} />

                            </Paper>
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
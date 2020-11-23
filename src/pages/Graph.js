import React, {Component} from "react";
import {
    GraphView, // required
    Edge, // optional
    IEdgeType as IEdge,
    INodeType as INode,
    LayoutEngineType,
    //type IEdge, // optional
    Node, // optional
    //type INode, // optional
    //type LayoutEngineType, // required to change the layoutEngineType, otherwise optional
    BwdlTransformer, // optional, Example JSON transformer
    GraphUtils // optional, useful utility functions
} from 'react-digraph';
import Form from "@rjsf/material-ui";


import GraphConfig, {
    edgeTypes,
    EMPTY_EDGE_TYPE,
    EMPTY_TYPE,
    NODE_KEY,
    nodeTypes,
    COMPLEX_CIRCLE_TYPE,
    POLY_TYPE,
    SPECIAL_CHILD_SUBTYPE,
    SPECIAL_EDGE_TYPE,
    SPECIAL_TYPE,
    SKINNY_TYPE,
} from '../Graph/graph-config';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import topology from "../components/react-digraph";
import schemaDevice from "../Forms/deviceSchemaForm";
import schemaEdge from "../Forms/edgeSchemaForm";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"; // Configures node/edge types

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

var sample = {
    "nodes": [
        {
            "id": 1,
            "title": "Node A",
            "x": 258.3976135253906,
            "y": 331.9783248901367,
            "type": "Cassini"
        },
        {
            "id": 2,
            "title": "Node B",
            "x": 593.9393920898438,
            "y": 260.6060791015625,
            "type": "Cassini_disabled"
        },
        {
            "id": 3,
            "title": "Node C",
            "x": 237.5757598876953,
            "y": 61.81818389892578,
            "type": "Qumran"
        },
        {
            "id": 4,
            "title": "Node C",
            "x": 600.5757598876953,
            "y": 600.81818389892578,
            "type": "Qumran_disabled"
        },
        {
            "id": 5,
            "title": "Node C",
            "x": 537.5757598876953,
            "y": 61.81818389892578,
            "type": "Tomahawk"
        },
        {
            "id": 6,
            "title": "Node C",
            "x": 700.5757598876953,
            "y": 600.81818389892578,
            "type": "Tomahawk_disabled"
        }
    ],
    "edges": [
        {
            "source": 1,
            "target": 2,
            "type": 'emptyEdge',
            "strokeWidth": '10px',
        },
        {
            "source": 2,
            "target": 4,
            "type": 'specialEdge'
        }
    ]
};

class Graph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            nodeDialogOpen: false,
            edgeDialogOpen:false,
            copiedNode: null,
            // graph: sample,
            graph: topology,
            layoutEngineType: undefined,
            selected: null,
            totalNodes: topology.nodes.length,
            // totalNodes: sample.nodes.length,
            anchorEl: null,
        };

    }

    handleClickNodeOpen = () => {
        this.setState({nodeDialogOpen:true});
    };

    handleDialogClose = () => {
        this.setState({
            nodeDialogOpen:false,
            edgeDialogOpen:false,
        });
    };


    // Updates the graph with a new node
    onCreateNode = (x: number, y: number) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = EMPTY_TYPE;

        this.handleClickNodeOpen();

        const viewNode = {
            id: this.state.graph.nodes.length +1,
            title: '',
            type,
            x,
            y,
        };

        graph.nodes = [...graph.nodes, viewNode];
        this.setState({ graph });
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
        const graph = this.state.graph;
        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type = EMPTY_EDGE_TYPE;
        this.setState({edgeDialogOpen: true});

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type,
        };

        // Only add the edge when the source node is not the same as the target
        if (viewEdge.source !== viewEdge.target) {
            graph.edges = [...graph.edges, viewEdge];
            this.setState({
                graph,
                selected: viewEdge,
            });
        }
    };


    // Deletes a node from the graph
    onDeleteNode = (viewNode: INode, nodeId: string, nodeArr: INode[]) => {
        const graph = this.state.graph;
        // Delete any connected edges
        const newEdges = graph.edges.filter((edge, i) => {
            return (
                edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
            );
        });

        graph.nodes = nodeArr;
        graph.edges = newEdges;

        this.setState({ graph, selected: null });
    };

    // Node 'mouseUp' handler
    onSelectNode = (viewNode: INode | null) => {
        // Deselect events will send Null viewNode
        this.setState({ selected: viewNode});
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge: IEdge) => {
        this.setState({ selected: viewEdge, anchorEl:true });
    };

    // Called when an edge is deleted
    onDeleteEdge = (viewEdge: IEdge, edges: IEdge[]) => {
        const graph = this.state.graph;

        graph.edges = edges;
        this.setState({
            graph,
            selected: null,
        });
    };

    handleChange = (event) => {
        this.setState({name: event.target.value});
    };

    handlePutName= () => {
        const ultimo = this.state.graph.nodes.length;
        this.state.graph.nodes[ultimo-1].title = this.state.name;
        const gr = this.state.graph;
        this.setState({graph: gr, nodeDialogOpen: false});
    };

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    /* Define custom graph editing methods here */

    render() {
        const nodes = this.state.graph.nodes;
        const edges = this.state.graph.edges;
        const selected = this.state.selected;

        const NodeTypes = GraphConfig.NodeTypes;
        const NodeSubtypes = GraphConfig.NodeSubtypes;
        const EdgeTypes = GraphConfig.EdgeTypes;



        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <div id='graph' style={{
                gridTemplateColumns: 'auto auto',
                height: '700px',
                width:'100%',
                gridColumnGap: '2px',
                display: 'flex',
            }}>

                <Dialog open={this.state.nodeDialogOpen} onClose={()=>{this.handleDialogClose()}} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <Form schema={schemaDevice}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.handleDialogClose()}} color="primary">
                            Cancel
                        </Button>
                        {/*<Button onClick={this.handlePutName} color="primary">*/}
                        {/*    Subscribe*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.edgeDialogOpen} onClose={()=>{this.handleDialogClose()}} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <Form schema={schemaEdge}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.handleDialogClose()}} color="primary">
                            Cancel
                        </Button>
                        {/*<Button onClick={this.handlePutName} color="primary">*/}
                        {/*    Subscribe*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Dialog>

                <Popover

                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 200, left: 400 }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Card >
                        <CardContent>
                            <Typography className={{title: {
                                fontSize: 14,
                            }}} color="textSecondary" gutterBottom>
                                Link
                            </Typography>
                            <Typography variant="h5" component="h2">
                                Type {this.state.selected ? this.state.selected.type: "no Selecciono item"}
                            </Typography>
                            <Typography color="textSecondary">
                                Velocity {this.state.selected ? this.state.selected.handleText : "no Selecciono item"}
                            </Typography>
                            <Typography variant="body2" component="p">
                                From {this.state.selected ? this.state.selected.label_from: "no Selecciono item"} to {this.state.selected ? this.state.selected.label_to: "no Selecciono item"}
                            </Typography>
                        </CardContent>
                    </Card>
                    {console.log(this.state.selected)}
                </Popover>
                <div>
                    <Button variant="contained" color="primary"
                            onClick={()=>{this.onCreateNode()}}>
                        New
                    </Button>
                    <br/><br/>
                    <Button variant="contained" color="primary" onClick={()=>{this.onCreateNode()}}>
                        How
                    </Button>
                </div>
                <GraphView  ref='GraphView'
                            nodeKey={NODE_KEY}
                            nodes={nodes}
                            edges={edges}
                            selected={selected}
                            nodeTypes={NodeTypes}
                            nodeSubtypes={NodeSubtypes}
                            edgeTypes={EdgeTypes}
                            onSelectNode={this.onSelectNode}
                            onCreateNode={this.onCreateNode}
                            onUpdateNode={this.onUpdateNode}
                            onDeleteNode={this.onDeleteNode}
                            onSelectEdge={this.onSelectEdge}
                            onCreateEdge={this.onCreateEdge}
                            onSwapEdge={this.onSwapEdge}
                            onDeleteEdge={this.onDeleteEdge}
                            edgeArrowSize={0.1}
                            afterRenderEdge={(id, element, edge, edgeContainer, isEdgeSelected) => {
                                try {
                                    const width = edge.handleText.split("G")[0]/20;
                                    const longType = edge.type.split("_");
                                    const type = longType[0];
                                    const disabled = longType[longType.length-1];
                                    console.log(edgeContainer);
                                    if(type === "CFP2"){
                                        edgeContainer.querySelector('.edge').setAttribute("style", "stroke-width:" + width + "px; stroke: red");
                                    }if(type === "UNKNOWN"){
                                        edgeContainer.querySelector('.edge').setAttribute("style", "stroke-width:" + width + "px; stroke: black");
                                    }else if(type === "OSPF28"){
                                        edgeContainer.querySelector('.edge').setAttribute("style", "stroke-width:" + width + "px; stroke: blue");
                                    }else if(disabled === "disabled"){
                                        edgeContainer.querySelector('.edge').setAttribute("style", "stroke-width:" + width + "px; stroke: grey");
                                    }else{
                                        console.log(edge);
                                    }
                                }catch (e) {
                                    console.log(e)
                                }

                            }}
                />
            </div>
        );
    }

}
export default Graph;
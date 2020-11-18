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


// const GraphConfig =  {
//     NodeTypes: {
//         empty: { // required to show empty nodes
//             typeText: "None",
//             shapeId: "#empty", // relates to the type property of a node
//             shape: (
//                 <symbol viewBox="0 0 100 100" id="empty" key="0">
//                     <circle cx="50" cy="50" r="45"></circle>
//                 </symbol>
//             )
//         },
//         custom: { // required to show empty nodes
//             typeText: "Custom",
//             shapeId: "#custom", // relates to the type property of a node
//             shape: (
//                 <symbol viewBox="0 0 50 25" id="custom" key="0">
//                     <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
//                 </symbol>
//             )
//         }
//     },
//     NodeSubtypes: {},
//     EdgeTypes: {
//         emptyEdge: {  // required to show empty edges
//             shapeId: "#emptyEdge",
//             shape: (
//                 <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
//                     <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
//                 </symbol>
//             )
//         }
//     }
// };


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
} from './graph-config';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import topology from "../components/react-digraph"; // Configures node/edge types

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
        },
        {
            "source": 2,
            "target": 4,
            "type": 'specialEdge'
        }
    ]
};
//
// const GraphConfig =  {
//     NodeTypes: {
//         empty: { // required to show empty nodes
//             typeText: "None",
//             shapeId: "#empty", // relates to the type property of a node
//             shape: (
//                 <symbol viewBox="0 0 100 100" id="empty" key="0">
//                     <circle cx="50" cy="50" r="45"></circle>
//                 </symbol>
//             )
//         },
//         custom: { // required to show empty nodes
//             typeText: "Custom",
//             shapeId: "#custom", // relates to the type property of a node
//             shape: (
//                 <symbol viewBox="0 0 50 25" id="custom" key="0">
//                     <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
//                 </symbol>
//             )
//         }
//     },
//     NodeSubtypes: {},
//     EdgeTypes: {
//         emptyEdge: {  // required to show empty edges
//             shapeId: "#emptyEdge",
//             shape: (
//                 <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
//                     <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
//                 </symbol>
//             )
//         }
//     }
// };

class Graph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            open: false,
            copiedNode: null,
            graph: sample,
            // graph: topology,
            layoutEngineType: undefined,
            selected: null,
            // totalNodes: topology.nodes.length,
            totalNodes: sample.nodes.length,
        };

    }

    handleClickOpen = () => {
        this.setState({open:true});
    };

    handleClose = () => {
        this.setState({open:false});
    };


    // Updates the graph with a new node
    onCreateNode = (x: number, y: number) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = EMPTY_TYPE;

        this.handleClickOpen();
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
        this.setState({ selected: viewNode });
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge: IEdge) => {
        this.setState({ selected: viewEdge });
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
        this.setState({graph: gr, open: false});
    };
    /* Define custom graph editing methods here */

    render() {
        const nodes = this.state.graph.nodes;
        const edges = this.state.graph.edges;
        const selected = this.state.selected;

        const NodeTypes = GraphConfig.NodeTypes;
        const NodeSubtypes = GraphConfig.NodeSubtypes;
        const EdgeTypes = GraphConfig.EdgeTypes;

        return (
            <div id='graph' style={{
                gridTemplateColumns: 'auto auto',
                height: '700px',
                gridColumnGap: '2px',
                backgroundColor: '#000',
                display: 'flex',
            }}>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Nombre del Nodo
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="email"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handlePutName} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>

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
                            edgeArrowSize={1}
                            afterRenderEdge={(id, element, edge, edgeContainer, isEdgeSelected) => {
                                console.log(element.style);
                                console.log(edge.style);
                                edgeContainer.querySelector('.edge').setAttribute("style", "stroke-width: 20px;");
                                console.log(edgeContainer.querySelector('.edge'));
                            }}
                />
            </div>
        );
    }

}
export default Graph;
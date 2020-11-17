import {Component} from "react";
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
} from './graph-config'; // Configures node/edge types

var sample = {
    "nodes": [
        {
            "id": 1,
            "title": "Node A",
            "x": 258.3976135253906,
            "y": 331.9783248901367,
            "type": "custom"
        },
        {
            "id": 2,
            "title": "Node B",
            "x": 593.9393920898438,
            "y": 260.6060791015625,
            "type": "custom"
        },
        {
            "id": 3,
            "title": "Node C",
            "x": 237.5757598876953,
            "y": 61.81818389892578,
            "type": "custom"
        },
        {
            "id": 4,
            "title": "Node C",
            "x": 600.5757598876953,
            "y": 600.81818389892578,
            "type": "custom"
        }
    ],
    "edges": [
        {
            "source": 1,
            "target": 2,
            "type": IEdge,
        },
        {
            "source": 2,
            "target": 4,
            "type": "emptyEdge"
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
            copiedNode: null,
            graph: sample,
            layoutEngineType: undefined,
            selected: null,
            totalNodes: sample.nodes.length,
        };

    }


    // Updates the graph with a new node
    onCreateNode = (x: number, y: number) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = Math.random() < 0.25 ? SPECIAL_TYPE : EMPTY_TYPE;

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
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                height: '700px',
                gridColumnGap: '2px',
                backgroundColor: '#000',
            }}>

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
                            onDeleteEdge={this.onDeleteEdge}/>
            </div>
        );
    }

}
export default Graph;
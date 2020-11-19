const schemaEdge = {
    title: "Edge",
    description: "Edge creation form",
    type: "object",
    required:["from","to","enable","velocity"],
    properties: {
        from: {type: "string", title: "From port"},
        to: {type: "string", title: "To port"},
        enable: {type: "boolean", title: "enabled", default: false},
        velocity: {type: "integer", title: "Velocity"},
    }
};

export default schemaEdge;
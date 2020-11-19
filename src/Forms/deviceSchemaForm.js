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

export default schemaDevice;
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

export default schemaPool;
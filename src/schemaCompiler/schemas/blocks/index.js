const schemaBlocks = {
    beautyText: {
        name: "Beauty Text",
        type: "beautyText",
        limit: 10,
        settings: [
            {
                type: "text"
            },
            {
                type: "color"
            },
            {
                type: "override"
            }
        ]
    }
}



module.exports = { schemaBlocks }

const schemaInputs = {
    text: {
        type: "text",
        id: "text",
        label: "Text"
    },
    color: {
        type: "color",
        id: "color",
        label: "Color",
        default: "#000"
    },
    override: {
        type: "checkbox",
        id: "override_color",
        label: "Override theme Text-color",
        default: false
    }
}



module.exports = { schemaInputs }
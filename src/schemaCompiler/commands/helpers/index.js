const { schemaBlocks } = require('../../schemas/blocks')
const { schemaInputs } = require('../../schemas/inputs')



const blockExist = schemaType => Object.keys(schemaBlocks).includes(schemaType)
const inputExist = schemaType => Object.keys(schemaInputs).includes(schemaType)

const isObj = obj => obj.constructor.toString().indexOf("Object") > -1
const isType = obj => {
    const types = ['Number', 'String', 'Boolean', 'Array', 'Object']
    let type
    for (type of types) {
        const i = obj.constructor.toString().indexOf(type)
        if (i > -1) {
            break
        } else {
            type = undefined
        }
    }
    return type
}



module.exports = {
    blockExist, inputExist,
    isObj, isType
}
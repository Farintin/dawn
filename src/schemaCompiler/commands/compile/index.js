const fs = require('fs')
const { schemaBlocks } = require('../../schemas/blocks')
const { schemaInputs } = require('../../schemas/inputs')
const { isType, isObj, blockExist, inputExist } = require('../helpers')

const { 
    readFile,
    getSectionFilenames, 
    getSectionSchemaObj, getSectionSchemaObjs, 
    writeSectionFile 
    } = require('./fileHandler')



const propKeys = ['keep', 'add', 'remove']

const objCompHandler = (obj, nLoop) => {
    // log('### Object Dive ###')
    nLoop += 1

    for (const key in obj) {
        let value = obj[key]
        let objType = isType(value)
        if (objType === undefined) {
            console.log(`'"${key}": ${value}' in \n${JSON.stringify(obj)}`)
            throw `Invalid Schema data-type`
        } else {
            compileSchemaObj({ obj: value, objType, nLoop })
        }
    }
    nLoop -= 1
    // log('### Object Jump ###')
    // log({ nLoop })
}
const arrayCompHandler = (objs, nLoop) => {
    nLoop += 1
    // log('### Array Dive ###')
    objs.forEach(obj => {
        if (isObj(obj)) {
            // console.log('###', { obj, objs })
            const { keep, add, remove } = obj
            // console.log({ keep, add, remove })
            const schemaType = obj.type
            if (schemaType !== undefined) { 
                let schemaSource
                if (blockExist(schemaType)) {
                    schemaSource = schemaBlocks[schemaType]
                } else if (inputExist(schemaType)) {
                    schemaSource = schemaInputs[schemaType]
                }
                Object.assign(obj, schemaSource)
            }
            if (keep !== undefined) {
                Object.keys(obj).forEach(k => {
                    if (!keep.includes(k)) delete obj[k]
                })
            }
            if (add !== undefined) {
                Object.assign(obj, add)
            }
            if (remove !== undefined) {
                remove.forEach(k => delete obj[k])
            }
            propKeys.forEach(k => delete obj[k])
        }
        
        let objType = isType(obj)
        if (objType === undefined) {
            console.log(`${obj} in ${JSON.stringify(objs)}, ${objs}`)
            throw `Invalid Schema data-type`
        } else {
            // console.log({ obj, objs }, '###')
            compileSchemaObj({ obj, objType, nLoop })
        }
    })
    // log('### Array Jump ###')
    nLoop -= 1
    // log({ nLoop })
}
const compileSchemaObj = ({ obj, objType = 'Object', nLoop = 0 }) => {
    // log({ nLoop })
    // log({obj})
    // log({objType})
    switch (objType) {
        case 'Object': 
            objCompHandler(obj, nLoop)
            break

        case 'Array':
            arrayCompHandler(obj, nLoop)
            break
        default:
            break
    }
}





module.exports = { 
    readFile,
    objCompHandler, arrayCompHandler, compileSchemaObj, 
    getSectionSchemaObj, getSectionSchemaObjs, getSectionFilenames, writeSectionFile
}
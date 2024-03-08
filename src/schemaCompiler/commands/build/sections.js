const fs = require('fs')
const { 
    readFile, 
    compileSchemaObj, 
    getSectionSchemaObj, getSectionFilenames } = require('../compile')
const { startingSchemaTagString, endingSchemaTagString } = require('../utils/constants')




const writeSectionFile = (fn, data) => {
    fs.writeFileSync(`./sections/${fn}.liquid`, data, (err) => {
        if (err) throw err
        console.log(`${fn} saved!`)
    })
}

const writeSchemaToSectionFile = ({ fn, schemaObj }) => {
    fn = fn.split('.')[0]
    const file = readFile(`./sections/${fn}.liquid`)
    const startingSchemaTagIndex = file.indexOf(startingSchemaTagString)
    const endingSchemaTagIndex = file.indexOf(endingSchemaTagString)
    if(startingSchemaTagIndex !== -1 && endingSchemaTagIndex !== -1) {
        /* const compiledFile = file.replace(
            /{% schema %}([\s\S]*?){% endschema %}/,
            `{% schema %}\n${JSON.stringify(schemaObj, null, 2)}\n{% endschema %}`
        ) 
        writeSectionFile(fn, compiledFile) */
        const compiledSchema = `{% schema %}\n${JSON.stringify(schemaObj, null, 2)}\n{% endschema %}`
        const schema = file.substring(startingSchemaTagIndex, endingSchemaTagIndex + endingSchemaTagString.length)
        if(compiledSchema !== schema) {
            const compiledFile = file.replace(/{% schema %}([\s\S]*?){% endschema %}/, compiledSchema)
            writeSectionFile(fn, compiledFile)
        } else {
            console.log(`no changes for ${fn} schema`)
        }
    } else {
        console.error(`No/Invalid schema tags in '/sections/${fn}'`)
    }
}
const buildSectionFile = (fn, log=true) => {
    const schemaObj = getSectionSchemaObj(fn)
    compileSchemaObj({ obj: schemaObj })
    writeSchemaToSectionFile({ fn, schemaObj })
    log ? console.log(fn, 'build successful') : ''
}
const buildSectionFiles = () => {
    const fns = getSectionFilenames()
    fns.forEach(fn => {
        buildSectionFile(fn, log=false)
    })
    console.log('all sections build successful')
}



module.exports = {
    buildSectionFile,
    buildSectionFiles
}
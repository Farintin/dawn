const fs = require('fs')
const { buildSectionFile, buildSectionFiles } = require('../build')



const watchSectionFiles = () => fs.watch("./src/schemaCompiler/sections", (_, fn) => buildSectionFile(fn))



module.exports = {
    watchSectionFiles, 
    buildSectionFiles
}
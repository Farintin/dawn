const { watchSectionFiles, buildSectionFiles } = require("./commands/watch")



const runSchemaCompiler = () => {
    console.log('######################################################')
    buildSectionFiles()
    watchSectionFiles()
}



module.exports = { runSchemaCompiler }
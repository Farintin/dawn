const fs = require('fs')



const readFile = fn => fs.readFileSync(fn, "utf-8", (err, file) => {
  // check for any errors
  if (err) {
    console.error('Error while reading the file:', err)
    throw err
  }
  return data
})
const getSectionSchemaObj = fn => {
  const file = readFile(`./src/schemaCompiler/sections/${fn}`)
  try {
    const data = JSON.parse(file)
    return data
  } catch (err) {
    console.error('Error while parsing JSON data:', err)
  }
}

const getSectionSchemaObjs = fns => fns.map(fn => getSectionSchemaObj(fn)) 

const getSectionFilenames = () => fs.readdirSync('./src/schemaCompiler/sections/')



module.exports = { 
  readFile,
  getSectionSchemaObj, 
  getSectionSchemaObjs, 
  getSectionFilenames
}
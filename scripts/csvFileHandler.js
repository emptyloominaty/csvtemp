const fs = require('fs')
const path = require('path')

function getCSVFiles() {
  const dirPath = path.join(__dirname,'..', 'csvdata')
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.csv'))
  return files.map(file => {
    const filePath = path.join(dirPath, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    return { name: file, content }
  });
}

module.exports = { getCSVFiles }
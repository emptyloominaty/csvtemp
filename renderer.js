let csvFiles = []

let thermometers = {}

let parsecsv = function(data) {
    let array = data.split('\r\n')
    array = array.slice(3)
    let resultArray = array.map(row => {
        let columns = row.split(',');
        columns[0] = columns[0].replace(' ', 'T');
        columns[0] = new Date(columns[0]);
        return columns;
    });
    return resultArray; 
}

window.addEventListener('DOMContentLoaded', () => {
  window.csvAPI.getCSVFiles().then(files => {
    console.log(files)
    csvFiles = files
    
    for (let i = 0; i<files.length; i++) {
        let fileName = files[i].name

        let name = fileName.split('_')[0];

        if (!thermometers.hasOwnProperty(name)) {
            thermometers[name] = [parsecsv(files[i].content)];
        } else {

            thermometers[name].push(parsecsv(files[i].content));
        }
        
    }



  });
});
let csvFiles = []

let thermometers = {}

let chartData = {
    "temperature": [27.8, 28.7, 29.6, 30.3, 27.4, 25.5, 22.6, 21.7, 20.9, 19.1, 20.0, 21.6, 21.3, 21.0, 22.3, 22.1, 22.9],
    "time": [1704704812, 1704704822, 1704704832, 1704704842, 1704704852, 1704704862, 1704704872, 1704704882, 1704704892, 1704704902, 1704704912, 1704704922, 1704704932, 1704704942, 1704704952, 1704704962, 1704704972]
}


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

        let name = fileName.split('_')[0]

        if (!thermometers.hasOwnProperty(name)) {
            thermometers[name] = [parsecsv(files[i].content)]
        } else {
            thermometers[name].push(parsecsv(files[i].content))
        }
    }

      tempData = thermometers[Object.keys(thermometers)[0]][0]   

      let tempHTML = ""
 
      Object.keys(thermometers).forEach(key => {
          tempHTML += `<button onclick="setDevice('${key}')">${key}</button>`
          tempHTML += "</button>"
      });
      document.getElementById("listDevices").innerHTML = tempHTML


      chart = new Chart(
          document.getElementById("chart"),
          {
              type: 'line',
              data: {
                  labels: chartData.time,
                  datasets: [
                      {
                          label: 'Temperature',
                          data: chartData.temperature,
                          fill: false,
                          borderColor: 'rgb(75, 192, 192)',
                          tension: 0.1
                      }
                  ]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  pointStyle: false/*,
                animation: {
                    duration: 0
                }*/
              }
          }
      )



  
  });
});
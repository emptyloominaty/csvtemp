let csvFiles = []

let thermometers = {}

let chartData = {
    "temperature": [0],
    "time": [0]
}

let chartDataDay = {
    "temperature": [0],
    "time": [0]
}


let parsecsv = function(data) {
    let array = data.split('\r\n')
    array = array.slice(3)
    let resultArray = array.map(row => {
        let columns = row.split(',')
        columns[0] = columns[0].replace(' ', 'T')
        columns[0] = new Date(columns[0])
        return columns;
    })
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
      })
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
                  pointStyle: false,
                  plugins: {
                      legend: {
                          display: false
                      }
                  }
              }
          }
      )

      chartDay = new Chart(
          document.getElementById("chartDay"),
          {
              type: 'line',
              data: {
                  labels: chartDataDay.time,
                  datasets: [
                      {
                          label: 'Temperature',
                          data: chartDataDay.temperature,
                          fill: false,
                          borderColor: 'rgb(75, 192, 192)',
                          tension: 0.1
                      }
                  ]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  pointStyle: false,
                  plugins: {
                      legend: {
                          display: false
                      }
                  }
              }
          }
      )

  
  })
})
let tempMin = 100
let tempMax = 0
let tempAvg = 0

let tempData = []

let getMinMaxAvg = function () {
    tempMin = 100
    tempMax = 0
    tempAvg = 0
    let v = 0
    let vi = 0
    for (i=0; i<tempData.length; i++) {
        let val = Number(tempData[i][1])
        v+= val
        vi++
        if (val>tempMax) {
            tempMax = val
        } else if (val<tempMin) {
            tempMin = val
        }
    }

    tempMax = Math.round(tempMax*10)/10
    tempMin = Math.round(tempMin*10)/10
    tempAvg = Math.round(v/vi*10)/10

    document.getElementById("tempMin").textContent = "Min:" + tempMin
    document.getElementById("tempMax").textContent = "Max:" + tempMax
    document.getElementById("tempAvg").textContent = "Avg:" + tempAvg
}

let setDevice = function (deviceName) {
    tempData = []
    for (let i = 0; i < thermometers[deviceName].length; i++) {
        tempData.push(...thermometers[deviceName][i])

    }
    document.getElementById("selectedDevice").textContent = deviceName
    getMinMaxAvg()

    let html = ""
    let iDay = 0
    let iMonth = 0
    let iYear = 0
    let avgTemp = 0
    let ii = 0
    let minTemp = 100
    let maxTemp = 0
    let date
    let year = 0
    let month = 0
    let day = 0
    chartData["temperature"] = []
    chartData["time"] = []
    let id = 0

    for (let i = 0; i < tempData.length; i++) {

        //--------------------------------
        if (i + 1 < tempData.length) {
            if (tempData[i + 1][0] > addMinutes(tempData[i][0], 30)) {
                let end = tempData[i + 1][0]
                let start = tempData[i][0]

                let diffMs = end - start
                let intervalMs = 15 * 60 * 1000
                let intervals = diffMs / intervalMs

                for (let a = 0; a < intervals; a++) {
                    let b = a + 1
                    tempData.splice(i + b, 0, [addMinutes(start, 15 * b),null])
                }
            }
        }

        //--------------------------------
        let val
        if (tempData[i][1] === null) {
            val = null
        } else {
            val = Number(tempData[i][1])
        }
        date = tempData[i][0]
        year = String(date.getFullYear())
        month = String(date.getMonth() + 1).padStart(2, '0')
        day = String(date.getDate()).padStart(2, '0')

        chartData["temperature"].push(val)
        chartData["time"].push(month+"."+day+".")

        if ((day !== iDay && iDay !== 0) || i === tempData.length-1) {
            avgTemp = avgTemp/ii
            html += "<div onclick=\"setDay('" + iDay + "','" + iMonth + "','"+ iYear +"',"+id+")\" class='day' id='day"+id+"' >"
            id++
            html += "<div><span class='yeard' >" + iYear + "</span>."
            html += "<span class='monthd' >" + iMonth + "</span></div>"
            html += "<span class='dayd'>" + iDay + "</span>"
            html += "<hr width='100%'>"
            html += "<span class='avgd'>" + Math.round(avgTemp * 10) / 10 + "</span>"
            html += "<span class='maxd'>" + Math.round(maxTemp * 10) / 10 + "</span>"
            html += "<span class='mind'>" + Math.round(minTemp * 10) / 10 + "</span>"
            html += "</div>"
            avgTemp =0
            ii = 0
            minTemp = 100
            maxTemp = 0
        }
        iDay = day
        iMonth = month
        iYear = year
 
        avgTemp += val
        if (val > maxTemp) {
            maxTemp = val
        } else if (val < minTemp) {
            minTemp = val
        }
        ii++
        
    }
    document.getElementById("output").innerHTML = html

    chart.data.datasets[0].data = chartData.temperature
    chart.data.labels = chartData.time
    chart.data.datasets[0].borderColor = getTempGradient(document.getElementById("chart"), chartData,chart)
    chart.update()
}

let getTempGradient = function (canvas, data, chart) {
    let filteredData = data.temperature.filter(value => value !== null && value !== 0);
    let minValue = Math.min(...filteredData)
    let maxValue = Math.max(...filteredData)
    let range = maxValue - minValue

    let gradient = canvas.getContext("2d").createLinearGradient(0, chart.chartArea.bottom, 0, chart.chartArea.top)

    let blueStop = Math.max((18 - minValue) / range, 0)
    let lightblueStop = Math.min(Math.max((20 - minValue) / range, blueStop), 1)
    let greenStop = Math.min(Math.max((22 - minValue) / range, lightblueStop), 1)
    let yellowStop = Math.min(Math.max((23 - minValue) / range, greenStop), 1)
    let redStop = Math.min((maxValue - minValue) / range, 1)

    gradient.addColorStop(blueStop, '#4284f5')
    gradient.addColorStop(lightblueStop, '#42a4f5')
    gradient.addColorStop(greenStop, 'green')
    gradient.addColorStop(yellowStop, 'yellow')
    gradient.addColorStop(redStop, 'red')
    return gradient
}

let addMinutes = function (date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
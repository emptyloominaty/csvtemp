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
    tempAvg=Math.round(v/vi*10)/10

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
    let avgTemp = 0
    let ii = 0
    let minTemp = 100
    let maxTemp = 0
    let date
    let month = 0
    let day = 0
    for (let i = 0; i < tempData.length; i++) {
        let val = tempData[i][1]
        date = tempData[i][0]
        month = String(date.getMonth() + 1).padStart(2, '0')
        day = String(date.getDate()).padStart(2, '0')

        if ((day !== iDay && iDay !== 0) || i === tempData.length-1) {
            avgTemp = avgTemp/ii
            html += "<div class='day'>"
            html += "<span class='monthd' >" + iMonth + "</span>"
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
 
        avgTemp += Number(val)
        if (val > maxTemp) {
            maxTemp = val
        } else if (val < minTemp) {
            minTemp = val
        }
        ii++
        
    }
    document.getElementById("output").innerHTML = html
}
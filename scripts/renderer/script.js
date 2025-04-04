let tempMin = 100
let tempMax = 0
let tempAvg = 0

let tempData = []

let getMinMaxAvg = function() {
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
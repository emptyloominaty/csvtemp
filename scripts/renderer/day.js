let chart2Set = "day"

/*let setDay = function (day, month, year, id) {
    if (chart2Set !== "day") {
        setWeekMonth(day, month, year, id)
        return
    }
    let date 
    let tyear
    let tmonth
    let tday
    let thour
    let tmin

    chartDataDay["temperature"] = []
    chartDataDay["time"] = []

    document.getElementById("ChartDTitle").textContent =  year + "." + month + "." + day + "."

    for (let i = 0; i < tempData.length; i++) {
        let val = Number(tempData[i][1])
        date = tempData[i][0]
        tyear = String(date.getFullYear())
        tmonth = String(date.getMonth() + 1).padStart(2, '0')
        tday = String(date.getDate()).padStart(2, '0')

        if (tday === day && tmonth === month && tyear === year) {
            thour = String(date.getHours()).padStart(2, '0')
            tmin = String(date.getMinutes()).padStart(2, '0')

            chartDataDay["temperature"].push(val)
            chartDataDay["time"].push(thour + ":" + tmin)

        }
    }

    const elements = document.querySelectorAll('.day');
    elements.forEach(el => el.classList.remove('active'));

    document.getElementById("day"+id).classList.add('active');

    chartDay.data.datasets[0].data = chartDataDay.temperature
    chartDay.data.labels = chartDataDay.time
    chartDay.data.datasets[0].borderColor = getTempGradient(document.getElementById("chartDay"), chartDataDay, chartDay)
    chartDay.update()
}*/


let setDay = function (day, month, year, id) {
    chartDataDay["temperature"] = []
    chartDataDay["time"] = []

    document.getElementById("ChartDTitle").textContent = year + "." + month + "." + day + " "

    let baseDate = new Date(`${year}-${month}-${day}`)
    let rangeInDays = 1
    if (chart2Set === "week") {
        rangeInDays = 7
    } else if (chart2Set === "month") {
        rangeInDays = 30
    } else if (chart2Set === "year") {
        rangeInDays = 365
    }

    let endDate = new Date(baseDate)
    endDate.setDate(endDate.getDate() + rangeInDays)

    for (let i = 0; i < tempData.length; i++) {
        let val = Number(tempData[i][1])
        let date = tempData[i][0]

        if (date >= baseDate && date <= endDate) {
            let thour = String(date.getHours()).padStart(2, '0')
            let tmin = String(date.getMinutes()).padStart(2, '0')
            let tday = String(date.getDate())
            let tmonth = String(date.getMonth() + 1)

            chartDataDay["temperature"].push(val)

            if (chart2Set === "week") {
                chartDataDay["time"].push(tday+". "+thour + ":" + tmin)
            } else if (chart2Set === "month") {
                chartDataDay["time"].push(tday + "." + tmonth + ". " + thour)
            } else if (chart2Set === "year") {
                chartDataDay["time"].push(tday + "." + tmonth + ". ")
            } else {
                chartDataDay["time"].push(thour + ":" + tmin)
            }
            


        }
    }

    const elements = document.querySelectorAll('.day');
    elements.forEach(el => el.classList.remove('active'));

    document.getElementById("day" + id).classList.add('active');

    chartDay.data.datasets[0].data = chartDataDay.temperature
    chartDay.data.labels = chartDataDay.time
    chartDay.data.datasets[0].borderColor = getTempGradient(document.getElementById("chartDay"), chartDataDay, chartDay)
    chartDay.update()
}

let setChart2 = function (val) {
    chart2Set = val
}
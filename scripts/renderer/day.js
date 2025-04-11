let setDay = function (day, month, year,id) {
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
}
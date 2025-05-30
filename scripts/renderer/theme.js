document.documentElement.setAttribute("data-theme", "light");

let toggleTheme = function () {
    let current = document.documentElement.getAttribute("data-theme")
    let newTheme = current === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", newTheme)

    let isDark = false
    if (newTheme === "dark") {
        isDark = true
    }

    chart.options.scales.x.ticks.color = isDark ? '#ccc' : '#444'
    chart.options.scales.y.ticks.color = isDark ? '#ccc' : '#444'
    chart.options.scales.x.grid.color = isDark ? '#444' : '#ccc'
    chart.options.scales.y.grid.color = isDark ? '#444' : '#ccc'
    chart.options.plugins.legend.labels.color = isDark ? '#fff' : '#000'
    chart.update()

    chartDay.options.scales.x.ticks.color = isDark ? '#ccc' : '#444'
    chartDay.options.scales.y.ticks.color = isDark ? '#ccc' : '#444'
    chartDay.options.scales.x.grid.color = isDark ? '#444' : '#ccc'
    chartDay.options.scales.y.grid.color = isDark ? '#444' : '#ccc'
    chartDay.options.plugins.legend.labels.color = isDark ? '#fff' : '#000'
    chartDay.update()
}

window.addEventListener('resize', () => {
    setTimeout(() => {
        if (chart.data.labels && chart.data.labels.length > 1) {
            chart.data.datasets[0].borderColor = getTempGradient(document.getElementById("chart"), chartData, chart)
            chart.update()
        }
        if (chartDay.data.labels && chartDay.data.labels.length > 1) {
            chartDay.data.datasets[0].borderColor = getTempGradient(document.getElementById("chartDay"), chartDataDay, chartDay)
            chartDay.update()
        }
    }, 100)
})
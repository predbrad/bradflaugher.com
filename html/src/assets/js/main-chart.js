function getChartsData() {
    return [
        {   id: 'bootcamp-bar-chart',
            axisLabels: {
                x: 'Years of Experience',
                y: 'Annual Total Compensation'
            },
            data: [
                {   x:'< 1',       y:78     },
                {   x:'1-4',       y:88     },
                {   x:'5-9',       y:105    },
                {   x:'10-19',     y:117    },
                {   x:'20+',       y:118    },

            ]
        }
    ];
}

function getChartsConfig() {

    const globalValues = {
        fontFamily: 'Roboto Mono',
        fontWeight: 400,
        labelsColor: '#646464',
        ticksColor: '#000000',
        dataLabelsColor: '#000000',
        mobileWidth: 600
    }

    let $output;
    if (isViewPortMaxWidth(globalValues.mobileWidth)) {
        $output = {
            font: {
                family: globalValues.fontFamily,
                size: 10,
                weight: globalValues.fontWeight,
                lineHeight: 1.3
            },
            bars: {
                barPercentage: 0.7,
                color: '#FFC000'
            },
            axis: {
                x: {
                    labelsColor: globalValues.labelsColor,
                    ticksColor: '#000000',
                    padding: 8
                },
                y: {
                    labelsColor: globalValues.labelsColor,
                    ticksColor: globalValues.ticksColor,
                    padding: 8
                }
            },
            dataLabels: {
                font: {
                    family: globalValues.fontFamily,
                    size: 12,
                    weight: globalValues.fontWeight,
                    lineHeight: 1.333333333
                },
                color: globalValues.dataLabelsColor,
                anchor: 'end',
                align: 'top',
                offset: 4
            }
        }
    } else {
        $output = {
            font: {
                family: globalValues.fontFamily,
                size: 16,
                weight: globalValues.fontWeight,
                lineHeight: 1.3125
            },
            bars: {
                barPercentage: 0.55,
                color: '#FFC000'
            },
            axis: {
                x: {
                    labelsColor: globalValues.labelsColor,
                    ticksColor: globalValues.ticksColor,
                    padding: 21
                },
                y: {
                    labelsColor: globalValues.labelsColor,
                    ticksColor: globalValues.ticksColor,
                    padding: 32
                }
            },
            dataLabels: {
                font: {
                    family: globalValues.fontFamily,
                    size: 20,
                    weight: globalValues.fontWeight,
                    lineHeight: 1.3
                },
                color: globalValues.dataLabelsColor,
                anchor: 'end',
                align: 'top',
                offset: 8
            }
        }
    }

    return $output
}

function getChart(chartData) {

    const canvasObject = document.getElementById(chartData.id);

    if (!canvasObject) return;

    const chartObject = canvasObject.getContext('2d');

    const chartConfig = getChartsConfig();

    new Chart(chartObject, {
        type: 'bar',
        data: {
            datasets: [{
                label: false,
                backgroundColor: chartConfig.bars.color,
                barPercentage: chartConfig.bars.barPercentage,
                data: chartData.data,
            }]
        },
        plugins: [
            ChartDataLabels
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: chartData.axisLabels.x,
                        color: chartConfig.axis.x.labelsColor,
                        font: chartConfig.font,
                        padding: chartConfig.axis.x.padding
                    },
                    ticks: {
                        color: chartConfig.axis.x.ticksColor,
                        font: chartConfig.font,
                    }
                },
                y: {
                    beginAtZero: false,
                    drawBorder: false,
                    title: {
                        display: true,
                        text: chartData.axisLabels.y,
                        color: chartConfig.axis.y.labelColor,
                        font: chartConfig.font,
                        padding: chartConfig.axis.y.padding
                    },
                    ticks: {
                        color: chartConfig.axis.y.ticksColor,
                        font: chartConfig.font,
                        callback: function callback(val) {
                            return '$' + val + 'k';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    font: chartConfig.dataLabels.font,
                    color: chartConfig.dataLabels.color,
                    anchor: chartConfig.dataLabels.anchor,
                    align: chartConfig.dataLabels.align,
                    offset: chartConfig.dataLabels.offset,
                    formatter: ( val ) => {
                        return '$' + val.y + 'k';
                    },
                }
            },
            events: [],
        },
    });
}

function getCharts() {
    const chartCanvas = document.getElementsByClassName('chart-canvas');

    if (chartCanvas.length > 0) {
        const chartData = getChartsData();

        if (chartData.length > 0) {
            for (let $i = 0; $i < chartData.length; $i++) {
                getChart(chartData[$i]);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getCharts();
})

window.addEventListener('resize',function() {
    // getCharts();
});
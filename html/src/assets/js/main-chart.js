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

function getChart(canvasObject, dataX, dataY, labelX, labelY) {

    if (!canvasObject) return;

    const chartObject = canvasObject.getContext('2d');

    const chartConfig = getChartsConfig();

    new Chart(chartObject, {
        type: 'bar',
        data: {
            labels: dataX,
            datasets: [{
                label: false,
                backgroundColor: chartConfig.bars.color,
                barPercentage: chartConfig.bars.barPercentage,
                data: dataY,
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
                        text: labelX,
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
                        text: labelY,
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
                    offset: chartConfig.dataLabels.offset
                }
            },
            events: [],
        },
    });
}

function getCharts() {
    const chartsCanvas = document.getElementsByClassName('chart-section__canvas');

    if (chartsCanvas.length > 0) {

        for (let $i = 0; $i < chartsCanvas.length; $i++) {
            let $dataX = chartsCanvas[$i].getAttribute('data-x-values')
                            ? chartsCanvas[$i].getAttribute('data-x-values').split(',')
                            : false;
            let $dataY = chartsCanvas[$i].getAttribute('data-y-values')
                            ? chartsCanvas[$i].getAttribute('data-y-values').split(',')
                            : false;

            let $labelX = chartsCanvas[$i].getAttribute('data-x-label')
                            ? chartsCanvas[$i].getAttribute('data-x-label')
                            : '';
            let $labelY = chartsCanvas[$i].getAttribute('data-y-label')
                            ? chartsCanvas[$i].getAttribute('data-y-label')
                            : '';

            if ( $dataX && $dataY) {
                getChart( chartsCanvas[$i], $dataX, $dataY, $labelX, $labelY )
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
document.addEventListener('DOMContentLoaded', function (event) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartConfig = {
        barColor: '#FFC000',
        labelsColor: '#646464',
        ticksColor: '#000000',
        font: {
            family: 'Roboto Mono',
            size: 16,
            weight: '400',
            lineHeight: 1.3125
        }
    };
    const chartData = {
        labels: {
            x: 'Years of Experience',
            y: 'Annual Total Compensation'
        },
        values: {
            x: ['< 1', '1-4', '5-9', '10-19', '20+'],
            y: [78, 88, 105, 117, 118]
        }
    };
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.values.x,
            datasets: [{
                label: false,
                data: chartData.values.y,
                backgroundColor: chartConfig.barColor,
                width: 5
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: chartData.labels.x,
                        color: chartConfig.labelsColor,
                        font: chartConfig.font
                    },
                    ticks: {
                        color: chartConfig.ticksColor,
                        font: chartConfig.font,
                    }
                },
                y: {
                    beginAtZero: true,
                    drawBorder: false,
                    title: {
                        display: true,
                        text: chartData.labels.y,
                        color: chartConfig.labelColor,
                        font: chartConfig.font,
                    },
                    ticks: {
                        color: chartConfig.ticksColor,
                        font: chartConfig.font,
                        callback: function callback(val, index) {
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
                    enabled: true
                }
            }
        }
    });
})
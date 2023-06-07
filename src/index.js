const inputData = {
    series: [1, 1],
    labels: ['random1', 'random2'],
}


var chartElement = document.querySelector("#chart");

var inputSection = document.querySelector("#inputSection")

var inputOne = document.createElement("input");
inputOne.setAttribute("id", "input1");


var inputTwo = document.createElement("input");
inputTwo.setAttribute('id', 'input2');

var addInputButton = document.querySelector("#addInputButton")

inputSection.appendChild(inputOne)
inputSection.appendChild(inputTwo)




var options = {
    chart: {
        type: 'pie'
    },
    series: inputData.series,
    labels: inputData.labels,
    dataLabels: {
        formatter: (val, { seriesIndex, dataPointIndex, w}) => {
            return w.config.labels[seriesIndex] // this will display the values of the inputs and not their share in the pie chart
        }
    },
    legend: { show: false }
}

var chart = new ApexCharts(chartElement, options);

chart.render();



inputSection.addEventListener("input", (e) => {
    switch(e.target.id){
        case "input1":
            inputData.labels[0] = e.target.value
            chart.updateSeries(inputData.series)
            break;
            case "input2":
                inputData.labels[1] = e.target.value
                chart.updateSeries(inputData.series)
            }
        })
        
        
const addInput = () => {
    inputData.series.push(1);
    chart.updateSeries(inputData.series)
}

const removeInput = () => {
    
}


addInputButton.addEventListener("click", addInput)
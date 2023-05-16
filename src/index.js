const inputData = {
    series: [1, 1],
    labels: ['random1', 'random2']
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
    labels: inputData.labels
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
    console.log("hi, add input")
}

const removeInput = () => {
    
}


addInputButton.addEventListener("click", addInput)
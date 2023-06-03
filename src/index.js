
// inputData is where the data gets manipulated and updates the wheel
const inputData = {
    series: [1, 1],
    labels: ['random1', 'random2']
}

var chartElement = document.querySelector("#chart"); // The wheel itself
var inputSection = document.querySelector("#inputSection") // The inputSection is the div where the inputs are located

// inputOne and inputTwo are created to then be added with Javascript
var inputOne = document.createElement('div');
var innerInputOne = document.createElement("input");
var labelInputOne = document.createElement('label');
labelInputOne.innerText = 'Input 1: '
inputOne.setAttribute("id", "input1");
innerInputOne.setAttribute("id", 'innerinput1');
inputOne.appendChild(labelInputOne);
inputOne.appendChild(innerInputOne);

var inputTwo = document.createElement('div');
var innerInputTwo = document.createElement("input");
var labelInputTwo = document.createElement('label');
labelInputTwo.innerText = 'Input 2: '
inputTwo.setAttribute("id", "input2");
innerInputTwo.setAttribute("id", 'innerinput2');
inputTwo.appendChild(labelInputTwo);
inputTwo.appendChild(innerInputTwo);

// this button initiates additive dom manipulation and adds data to inputData
var addInputButton = document.querySelector("#addInputButton")

// inputOne and inputTwo are added with Javascript
inputSection.appendChild(inputOne)
inputSection.appendChild(inputTwo)

// Options for the chart
var options = {
    chart: {
        type: 'pie'
    },
    series: inputData.series,
    labels: inputData.labels
}

// Chart is created with specified options and rendered to page
var chart = new ApexCharts(chartElement, options);
chart.render();

// On change in input, depending on the input that is changed, the chart is updated
inputSection.addEventListener("input", (e) => {
    switch(e.target.id){
        case "innerinput1":
            inputData.labels[0] = e.target.value
            chart.updateSeries(inputData.series)
            break;
        case "innerinput2":
            inputData.labels[1] = e.target.value
            chart.updateSeries(inputData.series)
            break;
        case "innerinput3":
            inputData.labels[2] = e.target.value
            chart.updateSeries(inputData.series)
            break;
        case "innerinput4":
            inputData.labels[3] = e.target.value
            chart.updateSeries(inputData.series)
            break;
        case 'innerinput5':
            inputData.labels[4] = e.target.value;
            chart.updateSeries(inputData.series);
            break;
        case 'innerinput6':
            inputData.labels[5] = e.target.value;
            chart.updateSeries(inputData.series);
            break;
        case 'innerinput7':
            inputData.labels[6] = e.target.value;
            chart.updateSeries(inputData.series);
            break;
        }
    })
        
// Input addition
const addInput = () => {
    // Create the input and set its identification
    let newInput = document.createElement('div');
    let newInnerInput = document.createElement('input');
    let newLabelInput = document.createElement('label');
    const currentInput = inputData.labels.length + 1;
    newLabelInput.innerText = 'Input '+currentInput+' ';
    newInput.setAttribute("id", "input"+currentInput);
    newInnerInput.setAttribute('id', 'innerinput'+currentInput);
    newInput.appendChild(newLabelInput);
    newInput.appendChild(newInnerInput);
    inputSection.appendChild(newInput)

    // Add to series array and labels array
    inputData.series.push(1);
    inputData.labels.push('random'+currentInput)
    chart.updateSeries(inputData.series)
}

// Input removal
const removeInput = () => {
    // remove using map and duplicate and array
}


addInputButton.addEventListener("click", addInput)
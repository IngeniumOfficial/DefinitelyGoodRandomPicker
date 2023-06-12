import { inputID } from "./inputIdentifier.js";


// inputData is where the data gets manipulated and updates the wheel
const inputData = {
    series: [1, 1],
    labels: ['random1', 'random2'],
}

//TODO: link the input data to local storage
let inputSizeCache = 2;

var chartElement = document.querySelector("#chart"); // The wheel itself
var inputSection = document.querySelector("#inputSection") // The inputSection is the div where the inputs are located

// existing elements for styling
var body = document.querySelector("body");

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
    labels: inputData.labels,
    dataLabels: {
        formatter: (val, { seriesIndex, dataPointIndex, w}) => {
            return w.config.labels[seriesIndex] // this will display the values of the inputs and not their share in the pie chart
        }
    },
    legend: { show: false }
}

// Chart is created with specified options and rendered to page
var chart = new ApexCharts(chartElement, options);
chart.render();

// On change in input, depending on the input that is changed, the chart is updated
inputSection.addEventListener("input", (e) => {
    const inputid = inputID(e);
    inputData.labels[inputid] = e.target.value;
    chart.updateSeries(inputData.series);
})

        
// Input addition
const addInput = () => {
    // Create the input and set its identification
    let newInput = document.createElement('div');
    let newInnerInput = document.createElement('input');
    let newLabelInput = document.createElement('label');
    let newInnerRemove = document.createElement('button');
    inputSizeCache += 1;
    let currentInput = inputSizeCache;
    newLabelInput.innerText = 'Input '+currentInput+': ';
    newInnerRemove.innerText = "X";
    newInnerRemove.setAttribute("class", "removeButton")
    newInnerRemove.style.fontWeight = "bold";
    newInput.setAttribute("id", "input"+currentInput);
    newInput.setAttribute("class", "inputGroup")
    newInnerInput.setAttribute('id', 'innerinput'+currentInput);
    newInnerRemove.setAttribute("id", currentInput);
    newInnerRemove.addEventListener("click", () => removeInput(newInnerRemove.id))
    newInput.appendChild(newLabelInput);
    newInput.appendChild(newInnerInput);
    newInput.appendChild(newInnerRemove);
    inputSection.appendChild(newInput)

    // Add to series array and labels array
    inputData.series.push(1);
    inputData.labels.push('random'+currentInput)
    chart.updateSeries(inputData.series)
}

// Input removal
const removeInput = (id) => {
    // remove element off the dom
    const inputSelect = "#input"+id
    document.querySelector(inputSelect).remove();

    console.log(inputData);
    console.log("series length 1:  ", inputData.series.length)
    // remove series by just popping one out
    inputData.series.pop();
    console.log("inputdata series 2:  ". inputData.series);

    // const tempLabelsArr = inputData.labels.filter((el, index) => {
    //     if(index !== (parseInt(id, 10)-1)) return el;
    // })
    // inputData.series = tempLabelsArr;

    // chart.updateSeries(inputData.series);
}


addInputButton.addEventListener("click", addInput)










// conditional styling
// TODO: allow user to select between light-theme and dark-theme
// TODO: store theme preference in local data
// const setDarkTheme = () => {
//     body.style.backgroundColor = "#383838";
// }
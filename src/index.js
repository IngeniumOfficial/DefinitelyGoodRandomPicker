import ApexCharts from "apexcharts";
import { targetValue } from "./targetValue.js";

// chart Size data is stored on sessionStorage because why not
sessionStorage.setItem("chartSize", "2");
sessionStorage.setItem("chartObj", JSON.stringify({ 1: "random1", 2: "random2"}))

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

var spinButton = document.querySelector("#spinButton");

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
    colors: ["#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C", "#EC6B56", "#FFC154", "#47B39C"],
    series: [1, 1],
    labels: ['random1', 'random2'],
    dataLabels: {
        formatter: (val, { seriesIndex, dataPointIndex, w}) => {
            return w.config.labels[seriesIndex] // this will display the values of the inputs and not their share in the pie chart
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                offset: 0,
                minAngleToShowLabel: 10
            }
        }
    },
    legend: { show: false }
}

// Chart is created with specified options and rendered to page
var chart = new ApexCharts(chartElement, options);
chart.render();

const inputInterpreter = (e) => {
    const currentAdjustor = sessionStorage.getItem("adjustor")
    // let's deal with double digits
    let num = "";
    for(let i = 0; i < e.target.id.length; i++) {
        if(parseInt(e.target.id[i], 10) || e.target.id[i]==="0") { // check with parseInt or if it's zero because parseInt doesn't work on zero
            num+=e.target.id[i];
        }
    }
    return parseInt(num, 10);
}

// On change in input, depending on the input that is changed, the chart is updated
inputSection.addEventListener("input", (e) => {
    // this is a pretty slow approach, but unfortunately, Apex charts only works with arrays
    const indextoTarget = inputInterpreter(e); // this just returns the number at the end of the id

    // get the chartObj value on sessionStorage
    const chartObj = JSON.parse(sessionStorage.getItem("chartObj"));
    chartObj[indextoTarget] = e.target.value; // update the value in the object
    options.labels = [...Object.values(chartObj)]; // update the chart labels from the chartObj
    sessionStorage.setItem("chartObj", JSON.stringify(chartObj)); // update the session Storage's chartObj

    // force the chart to update visually
    chart.updateOptions(options);
})

        
// Input addition
const addInput = () => {
    // check with session storage
    let inputSizeCache = parseInt(sessionStorage.getItem("chartSize"), 10) + 1; // immediately update the size since this will be bigger
    let chartObj = JSON.parse(sessionStorage.getItem("chartObj"));
    sessionStorage.setItem("chartSize", inputSizeCache.toString()); // update the session storage with new value as well

    // Create the input and its sub-elements
    let newInput = document.createElement('div');
    let newInnerInput = document.createElement('input');
    let newLabelInput = document.createElement('label');
    let newInnerRemove = document.createElement('button');

    // Set the data for the input element and its children elements
    newLabelInput.innerText = 'Input '+inputSizeCache+': ';
    newInnerRemove.innerText = "X";
    newInnerRemove.setAttribute("class", "removeButton")
    newInnerRemove.style.fontWeight = "bold";
    newInput.setAttribute("id", "input"+inputSizeCache);
    newInput.setAttribute("class", "inputGroup")
    newInnerInput.setAttribute('id', 'innerinput'+inputSizeCache);
    newInnerRemove.setAttribute("id", inputSizeCache);
    newInnerRemove.addEventListener("click", () => removeInput(newInnerRemove.id)) // This assigns delete functionality to delete button

    // Finally, append the children to the parent input element
    newInput.appendChild(newLabelInput);
    newInput.appendChild(newInnerInput);
    newInput.appendChild(newInnerRemove);
    inputSection.appendChild(newInput)

    // Update the options and chartObj
    const newValue = 'random'+inputSizeCache;
    options.series.push(1);
    options.labels.push(newValue)
    chartObj[inputSizeCache] = newValue;
    sessionStorage.setItem("chartObj", JSON.stringify(chartObj));

    chart.updateOptions(options);
}

// Input removal
const removeInput = (id) => {
    const chartObj = JSON.parse(sessionStorage.getItem("chartObj"));

    // remove element off the dom
    const inputSelect = "#input"+id
    document.querySelector(inputSelect).remove();

    const seriesPop = options.series.pop(); // remove series by just popping one out

    delete chartObj[id]; // use the id to locate the key-value pair in chartObj and delete it

    // now update the options and sessionStorage
    options.labels = [...Object.values(chartObj)];
    sessionStorage.setItem("chartObj", JSON.stringify(chartObj));

    chart.updateOptions(options);// update the chart visually
}

// on click of add input button, add input
addInputButton.addEventListener("click", addInput)





// this makes the wheel spin
// TODO: optimize wheel spin for more than two input data
const spinWheel = () => {
    // shift labels
    const shiftLabels = (target) => { // the second is the rigged value, the target is what unrigged will point to 
        const t = target-1; // find the index of the target
        const s = 1; // s for second value which will always be at index 1

        const tempLabel = options.labels[s];
        options.labels[s] = options.labels[t];
        options.labels[t] = tempLabel;
    }
    
    const windBack = [
        { transform: "rotate(-180deg)" }
    ]
    // TODO: make the spin look a bit more realistic by giving it leeway and stopping it at a random point within boundaries
    const spinForward = [
        { transform: "rotate(3605deg)" }
    ]

    chartElement.animate(windBack, { duration: 1500, iterations: 1, easing: "ease-in-out" })
    setTimeout(() => {
        shiftLabels(targetValue(options.labels));
        chart.updateOptions(options);
        chartElement.animate(spinForward, { duration: 4000, iterations: 1, easing: "ease-out", fill: "forwards" })
    }, 1600)
}

spinButton.addEventListener("click", spinWheel)






// conditional styling
// TODO: allow user to select between light-theme and dark-theme
// TODO: store theme preference in local data
// const setDarkTheme = () => {
//     body.style.backgroundColor = "#383838";
// }